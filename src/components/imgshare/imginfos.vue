<template>
	<div class="temp">
		<!-- 1.图片详情 -->
		<div class="imgDetails">
			<h4>{{this.imginfo[0].title}}</h4>
			<p><span>2012-5-20</span><span>0次浏览</span> </p>
			<div class="mui-content">
		        <ul  class="mui-table-view mui-grid-view mui-grid-9">
		            <li v-for="(item, index) in list" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		            	<img class="preview-img"  :src="item.src" height="100" @click="$preview.open(index, list)">
		            </li>
		            
		        </ul> 
			</div>
			<p class="content">{{this.imginfo[0].content}}</p>

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
				imginfo:[
					{
						id: 43,
						title: "清新有活力的公寓设计 用色彩焕然一新",
						click: 3,
						add_time: "2015-04-18T04:59:13.000Z",
						content: "Widawscy Studio为华沙的一处公寓做了设计，初看是最为保守的白底搭配木质元素，细看发现每个空间都被赋予了不同的色彩。面积最大的公共空间，包括客厅，餐厅和厨房采用了黄色的，让家人相聚时始终保持一颗愉快的心情，沉稳的灰色的主卧，轻快的蓝色调卧室，被芥末绿铺满的卫生间，减少配饰的使用 ，用色彩焕然一新。"
					}
				],
				list: [
					// {
			  //         src: 'https://placekitten.com/600/400',
			  //         w: 600,
			  //         h: 400
			  //       }, 
			  //       {
			  //         src: 'https://placekitten.com/1200/900',
			  //         w: 1200,
			  //         h: 900
			  //       }
			    ]
			}
		},
		created:function () {
			this.id = this.$route.params.id;
			this.getimgs()
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
			}
		}
	}
</script>
<style>
	.imgDetails{
		padding: 10px;
	}
	.imgDetails h4{
		color: #26a2ff;
	}
	.imgDetails p span{
		color: rgba(0,0,0,0.4);
	}
	.imgDetails .content{
		margin-top: 10px;
	}
</style>