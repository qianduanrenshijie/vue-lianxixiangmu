<template>
	<div class="temp">
		<div class="box">
			<div class="border">
				<slider :imgs="list"></slider>
			</div>
			
			<div class="border">
				<div class="buy">
					<h4>{{proinfo.title}}</h4>
					<p class="line"></p>
					<p>
						<span>市场价：<s>￥{{proinfo.market_price}}</s></span>
						<span>销售价：<em>￥{{proinfo.sell_price}}</em></span>
					</p>
					<div class="sum">
						<span>
							购买数量：
							<regulation></regulation>
						</span>
					</div>
					<mt-button type="primary">立即购买</mt-button>
					<mt-button type="danger">加入购物车</mt-button>
				</div>
			</div>
			<div class="border">
				<div class="parameter">
					<span>商品参数</span>
					<p class="line"></p>
					<div class="parameterPart">
						<p>商品商号：{{proinfo.goods_no}}</p>
						<p>库存情况：{{proinfo.stock_quantity}}</p>
						<p>上架时间：{{proinfo.add_time | dataTime('YYYY-MM-DD')}}</p>
						<!-- 时间格式时字符串 -->
					</div>
					
				</div>
			</div>
			<div class="border">
				<div class="btn">
					<router-link v-bind="{ to:'/goods/goodcentos/' + proinfo.id }">	
						<mt-button class="btnDetail" type="primary" size="large">图文详解</mt-button>
					</router-link>	
					<router-link v-bind="{ to:'/goods/goodprocomment/' + proinfo.id }">	
						<mt-button type="danger" size="large">商品评论</mt-button>
					</router-link>	
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import common from '../../kits/common.js';
	import slider from '../subcom/slider.vue';
	import regulation from '../subcom/proamount.vue'
	export default{
		components:{
			slider,
			regulation
		},
		data(){
			return {
				id:0,
				list:[],
				proinfo:{},
			}
		},
		methods:{
			getimginfos:function () {
				// common.apidomain +'/api/goods/getinfo/'+this.id;
				var url = common.apidomain + '/api/getthumimages/' + this.id;
				this.$http.get(url).then(function (res) {
					var data = res.body;
					if(data.status != 0){
						Toast(data.message);
						return
					}
					this.list = data.message
				})
			},
			getproinfo:function () {
				var url = common.apidomain + '/api/goods/getinfo/' + this.id;
				this.$http.get(url).then(function (res) {
					var data = res.body;
					if(data.status != 0){
						Toast(data.message)
					}
					this.proinfo = data.message[0]
				})
			}
		},
		created:function () {
			this.id = this.$route.params.id;
			this.getimginfos();
			this.getproinfo()
		}

	}
</script>
<style>
	.temp .box{
		padding-top: 5px;
	} 
	.temp .border{
		border: 1px solid rgba(0,0,0,0.5);
		margin: 5px;
		margin-top: 0px;
		padding: 10px;
		border-radius: 5px;
	}
	.border .buy h4{
		color: #26a2ff;
		margin-bottom: 10px;
	}
	.border .line{
		height: 1px;
		width:100%;
		border-top: 1px solid rgba(0,0,0,0.5);
		margin-top: 5px;
	}
	.buy p span{
		margin-right: 10px;
	}
	.buy p span em{
		font-style: normal;
		font-size: 18px;
		color: red;
	}
	.buy .sum{
		margin-bottom: 15px;
		margin-top: 15px;
		position: relative;
	}
	.parameter{
		font-size: 12px;
	}
	.parameterPart{
		padding: 10px;
	}
	.btn .btnDetail{
		margin-bottom: 20px;
	}
</style>