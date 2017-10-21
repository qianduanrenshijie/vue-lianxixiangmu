<template>
	<div >
		<span class="subtract" @click="subtract()">-</span>
		<span class="num" v-text='initCount'></span>
		<span class="add" @click="add()">+</span>
	</div>
</template>
<script>
	
	export default{
		props:['initCount','goodsid'],
		data(){
			return {
				count:1,
				resObj:{goodsid:0,type:'add'}
			}
		},
		created:function () {
			this.count = this.initCount;
		},
		methods:{
			add:function () {
				this.count++;
				this.sendmessage('add')
			},
			subtract:function () {
				this.count--
				if(this.count < 1){
					this.count = 1
				};
				this.sendmessage('subtract')
			},
			//子级向夫级传数据
			sendmessage(type){
				this.resObj.goodsid = this.goodsid;
				this.resObj.type = type;
				this.$emit('carobjdata',this.resObj);
			}
		},
		
	}
</script>
<style>
	.bottom span{
		display: inline-block;
		width: 30px;
		height: 25px;
		border: 1px solid #000;
		float: left;
		margin-right: 5px;
		text-align: center;
		line-height: 25px;
	}
</style>