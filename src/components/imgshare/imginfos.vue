<template>
	<div class="temp">
		<!-- 1.图片详情 -->
		<div class="imgDetails">
			<h4 class="tit">{{this.imginfo.title}}</h4>
			<!-- this.imginfo[0].title这样写会出现title未定义错误 -->
			<p><span>2012-5-20</span><span>0次浏览</span> </p>
			<div class="mui-content">
		        <ul  class="mui-table-view mui-grid-view mui-grid-9">
		            <li v-for="(item, index) in list" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, list)">
		            </li>
		            
		        </ul> 
			</div>
			<p class="content">{{this.imginfo.content}}</p>

			<!-- 评论 -->
			<comment :id="id"></comment>	
		</div>
		<!-- 2.评论 -->
	</div>
</template>
<script>
	import comment from "../subcom/comment.vue"

	import common from "../../kits/common.js"
	import { Toast } from 'mint-ui';
	export default{
		components:{
			comment
		},
		data(){
			return {
				id:0,
				imginfo:[],
				list: [],
			}
		},
		created:function () {
			this.id = this.$route.params.id;
			this.getimgs();
			this.getimginfo()
		},
		methods:{
			getimgs:function () {
				var url = common.apidomain + '/api/getthumimages/' + this.id;
				this.$http.get(url).then(function (res) {
					var data = res.body;
					if(data.status != 0 ){
						Toast(data.message)
						return
					}
					//forEach遍历里面的每对象，item相当里面的每个对象。在调用相应的属性。
					data.message.forEach(function (item) {
						var img = document.createElement("img");
						img.src = item.src;
						item.h = img.height;
						item.w = img.width;
					})
					this.list = data.message
				})
			},
			getimginfo:function () {
				var url = common.apidomain + '/api/getimageInfo/' + this.id;
				this.$http.get(url).then(function (res) {
					var data = res.body;
					if(data.status != 0){
						Toast(data.message)
						return
					}
					this.imginfo = data.message[0];
					console.log(this.imginfo)
				})
			}
		}
	}
</script>
<style>
	.imgDetails{
		padding: 10px;
	}
	.imgDetails .tit{
		color: #26a2ff;
	}
	.imgDetails p span{
		color: rgba(0,0,0,0.4);
	}
	.imgDetails .content{
		margin-top: 10px;
	}
</style>