<template>
	<div >
		<span class="subtract" @click="subtract()">-</span>
		<span class="num" v-text='num'></span>
		<span class="add" @click="add()">+</span>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				num:1,
			}
		},
		methods:{
			add:function () {
				this.num++;
				this.sendmessage()
			},
			subtract:function () {
				this.num--
				if(this.num < 1){
					this.num = 1
				};
				this.sendmessage()
			},
			//子级向夫级传数据
			sendmessage(){
				this.$emit('objdata',this.num)
			}
		},
		
	}
</script>
<style>
	.regulation span{
		display: inline-block;
		width: 40px;
		height: 25px;
		border: 1px solid #000;
		float: left;
		margin-right: 5px;
		text-align: center;
		line-height: 25px;
	}
</style>