<template>
	<div class="temp">
		<div class="title">
			<h4>提交评论</h4>
			<p></p>
			<textarea name="" placeholder="填写发表的内容" v-model = 'setcomment'></textarea>
			<mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
		</div>
		<div class="list">
			<h4>评论列表</h4>
			<p></p>
			 <!-- 评论内容 -->
			<div v-for="(item,index) in list" :key='index'> <!-- item与index之间用","相连 -->
			<!-- :key='index'标识唯一性 -->
				<div class="topCom">
					<span>第{{index + 1}}楼:</span>
					<span>用户：{{item.user_name}}</span>
					<span>发表时间：{{item.add_time | dataTime('YYYY-MM-DD HH:mm:ss')}}</span>
				</div>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" v-text="item.content"></li>
				</ul>
			</div>
			<!-- 加载更多 -->
			<mt-button type="danger" size="large" plain @click="getmore">加载跟多</mt-button>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import commont from '../../kits/common.js'
	export default{
		data(){
			return {
				setcomment:'',
				list:[],
				pageindex:1
			}
		},
		created(){
			this.getcomment(this.pageindex)      //此处调用一定要用this进行指向
		},
		props:["id"],  //获取父元素的id值
		methods:{
			//提交数据
			postcomment:function () {
				var url = commont.apidomain + '/api/postcomment/' + this.id;
				this.$http.post(url,{content:this.setcomment},{emulateJSON:true}).then(function(res) {
					var data = res.body
					this.setcomment = ''
				});
				// this.getcomment(1)
				this.list = [{
					"user_name": "匿名用户",
					"add_time": new Date(),
					"content": this.setcomment
				}].concat(this.list)
			},
			//获取数据
			getcomment:function (pageindex) {
				var pageindex = pageindex || 1 ;
				var url = commont.apidomain + '/api/getcomments/' + this.id + '?pageindex=' +pageindex;
				this.$http.get(url).then(function (res) {
					var data = res.body
					if(data.status != 0){
						Toast(data.message)
						return
					}
					this.list = this.list.concat(data.message)
				})
			},
			//加载更多
			getmore:function () {
				this.pageindex++;
				this.getcomment(this.pageindex);
			}
		}
	}
</script>
<style>
	.title,.list{
		padding: 5px;
	}
	.title p,.list p{
		height: 1px;
		width: 100%;
		border-top: 1px solid rgba(0,0,0,0.3)
	}
	.topCom{
		padding: 5px;
		color: #6d6d72;
		font-size: 15px;
		background-color: rgba(0,0,0,0.1);
	}
</style>