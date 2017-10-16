<template>
	<div class="temp">
		<div id="prolist">
			<div class="mui-content" style="background-color:#fff">
			    <ul class="mui-table-view mui-grid-view">
			        
			        <li v-for="item in prolist" class="mui-table-view-cell mui-media mui-col-xs-6">
			            <router-link v-bind="{to:'/goods/goodsinfo/' + item.id}">
			                <img class="mui-media-object" :src="item.img_url">
			                <div class="mui-media-body">{{item.title}}</div>
			                <div class="dexc">
			                	<p><span>￥2400</span><s>￥2500</s></p>
			                	<p><span>热卖中</span><span>剩余60件</span></p>
			                </div>
			            </router-link>
			        </li>
			    </ul>    
			</div>
		</div>
		<div class="getMore">
			<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
		</div>
	</div>
</template>
<script>
	import common from '../../kits/common.js';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				prolist:[],
				num:1,
			}
		},
		created:function () {
			this.getprolist(this.num)
		},
		methods:{
			getprolist:function (num) {
				var num = num || 1;
				var url = common.apidomain + '/api/getgoods?pageindex=' + num;
				this.$http.get(url).then(function (res) {
					var data = res.body;
					if(data.status != 0){
						Toast(data.message)
						return
					}
					this.prolist = this.prolist.concat(data.message)
				})
			},
			getMore:function () {
				this.num++
				this.getprolist(this.num)
			}
		},

	}
</script>
<style>
	#prolist ul{
		padding: 0 2px 2px 0;
		/*border: 1px solid rgba(0,0,0,0);*/
		margin: 0;
		/*padding-top: 10px;*/
	};
	#prolist li{
		padding: 4px;
		
		margin: 0px;
		border: 1px solid rgba(0,0,0,0.5);
		margin-top: 10px;
	}
	#prolist li a{
		padding: 0px;
		margin: 0px;
	}
	#prolist .dexc{
		width: 100%;
		height: 60px;
		background-color:rgba(0,0,0,0.1); 
		margin-top: 5px;
	}
	#prolist .dexc p{
		text-align: left;
	}
	#prolist .dexc p:first-child span{
		color: red;
		font-size: 16px;
		margin-right: 5px;
	}
	/*#prolist .dexc p:last-child{
		position: relative;
	}*/
	#prolist .dexc p:last-child span:first-child{
		position: absolute;
		bottom: 0px;
		left: 5px;
	}
	#prolist .dexc p:last-child span:last-child{
		position: absolute;
		bottom: 0px;
		right: 5px;
	}
	.getMore{
		margin-top: 10px;
		padding: 2px;
	}
</style>