<template lang="html">
    <div class="temp">
        	<div class="row" v-for="(item,index) in shoplist">
        		<mt-switch v-model="value[index]"></mt-switch>
        		<img class="img" :src="item.thumb_path">
        		<div class="inforight">
        				<h4 v-text="item.title"></h4>
        				<div class="bottom">
        					<ul>
        						<li>￥{{item.sell_price}}</li>
        						<li><a href="javascript:;" @click="delet(item.id,index)">删除</a></li>
        						<li>
        							<carproamount :initCount="item.cou" :goodsid="item.id" v-on:carobjdata = "getInputNumber"></carproamount>
        						</li>
        					</ul>
        				</div>
        		</div>
        	</div>

			<div id="total">
				<div class="desc">
					<ul>
						<li>总计（不含运费）</li>
						<li>已勾选商品{{totalcount}}件,总价:￥{{priceAll}}元</li>
					</ul>
				</div>
				<div id="button">
					<mt-button  type="danger" size="small">去结算</mt-button>
				</div>
			</div>

        	{{this.value}}
    </div>
</template>

<script>
import {getgoodsObject,updataData,removeItem} from '../../kits/localStorage.js';
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
import carproamount from '../subcom/carproamount.vue'
export default {
	components:{carproamount},
	computed:{
		totalcount(){
			
			var trueArr = this.value.filter(function (item) {
				return item
			});

			var amount = 0;
			this.value.forEach((item,index)=>{
				if(item){
					// console.log(item)
					var count = this.shoplist[index].cou;

					var price = this.shoplist[index].sell_price;

					var priceSum = count * price;
					amount += priceSum
					
				}
			});
			this.priceAll = amount
			return trueArr.length
			// console.log(trueArr.length)
		},
	},
	data(){
		return{
			value:[],
			shoplist:[],
			priceAll:0,		
		}
	},
	methods:{
		//删除产品
		delet(id,index){
			//移除value里面的数据
			this.value.splice(index,1);
			//移除shoplist里面对应的数据
			this.shoplist.splice(index,1);
			//去删除localStorage里面的数据
			removeItem(id)
		},
		//接受加减后传过来的值
		getInputNumber(resObj){
			// console.log(resObj)
			updataData(resObj)

			//更新shoplist里面的商品数量。
			for(var i = 0; i < this.shoplist.length; i++){
				if(this.shoplist[i].id == resObj.goodsid){
					if(resObj.type == 'add'){
						this.shoplist[i].cou++
					}else{
						if (this.shoplist[i].cou <= 1) {
							this.shoplist[i].cou = 1
						}else{
							this.shoplist[i].cou--
						}
					}
					break
				}
			}
		},
		//获取数据
		getdatalist() {
			//获取localStorage的值，在取出id。
			var obj = getgoodsObject()
			console.log(obj)
			var idstring = '';
			for(var key in obj){
				idstring += key + ','
			}
			//拼接id后去掉最后一个“，”号
			idstring = idstring.substring(0,idstring.length-1) || 0
			//获取服务器数据
			var url = common.apidomain + '/api/goods/getshopcarlist/' + idstring;
			this.$http.get(url).then(function (res) {
				var data = res.body;
				if(data.status != 0){
					Toast(data.message)
				}
				//把商品数量复制给数据里面的cou。
				data.message.forEach(function (item) {
					item.cou = obj[item.id]
				})
				this.shoplist = data.message
			})
		},

	},
	created:function () {
		this.getdatalist()
	}
}
</script>

<style lang="css">
	li{
		list-style: none;
	}
	.row{
		border-bottom: 1px solid rgba(0,0,0,0.3);
		height: 102px;
		display: flex;
		padding: 10px 5px 10px 5px;
	}
	.switch{
		flex:0 0 52px;
	}
	.img{
		margin-left: 5px;
		height: 75px;
		width: 75px;
		flex: 0 0 85px;
	}
	.inforight{
		margin-left: 5px;
		flex:1;
	}
	.inforight ul{
		padding-left: 0px;
	}
	.inforight li{
		list-style: none;
		display: inline-block;
	}

	.inforight h4{
		color: #0094ff;
		font-size: 14px;
	}

	.bottom li:first-child{
		color:red;
		margin-right: 5px;
	}

	.bottom li:last-child{
		float: right;
		
	}
	.bottom li:nth-child(2){
		margin-left: 5px;
		float: right;
	}


	#total{
		height: 100px;
		background-color: rgba(0,0,0,0.1);
		display: flex;
		padding: 5px;;
	}

	#total ul {
	 padding-left: 0px;
	}
	#total li{
		list-style: none;
		font-size: 14px;
	}

	#button{
		flex:0 0 60px;
		margin: 30px 0 0 0 ;
	}

	.desc{

		flex:1;
	}
</style>
