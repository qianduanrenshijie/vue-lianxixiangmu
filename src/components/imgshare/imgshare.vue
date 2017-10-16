<template>
	<div class="temp">
		<!-- 顶部导航栏 -->
		<div class="tab">
			<ul>
				<li @click="getimg(0)">全部&nbsp;<span>|</span>&nbsp;</li>
				<li v-for="item in tablist" @click="getimg(item.id)">
					{{item.title}}&nbsp;<span>|</span>&nbsp;
				</li>
			</ul>
		</div>
		<!-- 图片分享 -->
		<div class="imgshare">
			<ul>
				<li v-for="item in imglist">
					<router-link  v-bind = "{ to:'/imgshare/imginfos/' + item.id}">
					<!-- 注意在拼接字符串时“ 单引号 ”和“ 双引号 ” -->
						<img v-lazy="item.img_url">
						<div class="intro">
							<h4>{{item.title}}</h4>
							<p>{{item.zhaiyao}}</p>
						</div>
					</router-link>
				</li>
			</ul>
			
		</div>
	</div>
</template>
<script>
	import common from "../../kits/common.js"
	import { Toast } from 'mint-ui';

	export default{
		data(){
			return {
				tablist:[],
				imglist:[],
				cateid:0,
			}
		},
		created:function () {
			this.gettab()
			this.getimg(this.cateid)
		},
		methods:{
			gettab:function () {
				var url = common.apidomain + '/api/getimgcategory'
				this.$http.get(url).then(function (res) {
					var data = res.body;
					if(data.status != 0){
						Toast(data.message)
						return
					}
					this.tablist = data.message

				})
			},
			getimg:function (cateid) {
				var cateids = cateid || 0;
				var url = common.apidomain + "/api/getimages/" + cateids;
				this.$http.get(url).then(function (res) {
					var data = res.body;
					if(data.status != 0){
						Toast(data.message)
						return
					}
					this.imglist = data.message
				})
			}
		}
	}
</script>
<style>
	.tab{
		width: 375px;
		max-width:375px; 
		overflow-x:auto;
		padding: 10px;
	}
	.tab ul{
		margin: 0px;
		padding-left: 10px;
		width: 1000px;
	}
	.tab ul li{
		display: inline-block;
		color: #26a2ff;
	}
	.imgshare ul{
		padding: 0px;
		margin: 0px;
	}
	.imgshare li{
		list-style: none;
		position: relative;
	}
	.imgshare img{
		width: 100%;
		height: 300px;
	}
	.intro{
		background-color: rgba(0,0,0,0.3);
		position: absolute;
		left: 0px;
		bottom: 2px;
		color: #fff;
		padding: 5px;
	}
	.intro h4{
		font-size: 16px;
		margin: 0px;
	}
	.intro p{
		color: #fff;
		margin-bottom: 0px;
		margin-top: 5px;
	}
</style>