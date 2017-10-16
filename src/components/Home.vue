<template lang="html">
    <div class="temp">
        <mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in list" :key="item.id">
				<img :src='item.img'>
			</mt-swipe-item>
		</mt-swipe>
		<div class="mui-content">
			<ul class="mui-table-view mui-grid-view mui-grid-9">
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
			    	<router-link to="/news/newslist">
			        	<span class="mui-icon mui-icon-home"></span>
			        	 <div class="mui-media-body">新闻资讯</div>
			        </router-link>
			    </li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
			    	<router-link to="/imgshare/allimg">
				        <span class="mui-icon mui-icon-email"></span>
				        <div class="mui-media-body">图片分享</div>
			        </router-link>
			    </li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
			    	<router-link to="#">
			        	<span class="mui-icon mui-icon-chatbubble"></span>
			            <div class="mui-media-body">商品购买</div>
			        </router-link>
			    </li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
			    	<router-link to="#">
				        <span class="mui-icon mui-icon-location"></span>
				        <div class="mui-media-body">l留言反馈</div>
			        </router-link>
			    </li>
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
			    	<router-link to="#">
			            <span class="mui-icon mui-icon-search"></span>
			            <div class="mui-media-body">视频专区</div>
			        </router-link>
			    </li> 
			    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
			    	<router-link to="#">
			            <span class="mui-icon mui-icon-search"></span>
			            <div class="mui-media-body">联系我们</div>
			        </router-link>
			    </li> 
			</ul> 
		</div>
    </div>
</template>

<script>
	//提示信息
	import { Toast } from 'mint-ui';
	import common from '../kits/common.js'
	export default {
		data(){
			return{
				list:[],
			}
		},
		created:function(){
			this.getImg()
		},
		methods:{
			getImg(){
				var url = common.apidomain + '/api/getlunbo';
				this.$http.get(url).then(function(res){
					var data = res.body;
					if(data.status != 0){
						Toast(data.message);
						return;
					};
					this.list = data.message;
				})
			}
		}
	}
</script>

<style scoped>  /*scoped去除全局样式*/
	.temp .mint-swipe{
		height:200px;
	}
	.mint-swipe-item img{
		width: 100%;
	}
	.mint-swipe-item{
        width: 100%;
        height: 300px;
    }

    .mui-grid-view.mui-grid-9,.mui-content,.mui-content ul{
		background-color: #fff !important;
	}
	.temp .mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border-right:0px;
		border-bottom:0px;
	}
	.temp .mui-grid-view.mui-grid-9{
		border-top:0px;
		border-left:0px;
	};
	.mui-table-view .mui-icon-home:before,
	.mui-table-view .mui-icon-email:before,
	.mui-table-view .mui-icon-chatbubble:before,
	.mui-table-view .mui-icon-location:before,
	.mui-table-view .mui-icon-search:before,
	.mui-table-view .mui-icon-phone:before{
		content: '';
		display: inline-block;
		width: 50px;
		height: 50px;
		background-repeat: round;   /*round背景图像自动缩放直到适应且填充满整个容器*/
	}

	.mui-table-view .mui-icon-home:before{
		background-image: url(../../statics/imgs/1.png);
	}

	.mui-table-view .mui-icon-email:before{
		background-image: url(../../statics/imgs/2.png);
	}
	.mui-table-view .mui-icon-chatbubble:before{
		background-image: url(../../statics/imgs/3.png);
	}
	.mui-table-view .mui-icon-location:before{
		background-image: url(../../statics/imgs/4.png);
	}
	.mui-table-view .mui-icon-search:before{
		background-image: url(../../statics/imgs/5.png);
	}
	.mui-table-view .mui-icon-phone:before{
		background-image: url(../../statics/imgs/6.png);
	}
</style>