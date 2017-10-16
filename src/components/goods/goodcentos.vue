<template>
	<div class="temp">
		<div class="centos">
			<h4 class="tit">{{content.title}}</h4>
			<p class="line"></p>
			<p v-html="content.content"></p>
		</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import common from '../../kits/common.js';
	export default{
		data(){
			return{
				id:0,
				content:{
//					"title": "华为（HUAWEI）荣耀6Plus 16G双4G版",
//					"content": "<p>\r\n\t荣耀6 Plus，该机型分为两款型号，分别为PE-TL10和PE-UL00的新机型，并且根据工信部设备认证中心公布的信息显示，移动版本PE-TL20和PE-TL00M也已经拿到了入网许可证，拥有7.5mm的纤薄机身，支持TDD-LTE/TD-SCDMA/GSM网络。双800万后置摄像头+800万前置摄像头。采用5.5英寸1080p分辨率显示屏，搭载1.8GHz麒麟925八核处理器，内置3GB RAM+32GB ROM存储组合，支持存储卡扩展。\r\n</p>\r\n<p align=\"center\">\r\n\t<span style=\"color:#FF0000;font-size:16px;\"><img class=\"gomeImgLoad\" alt=\"\" src=\"http://img5.gomein.net.cn/image/bbcimg/productDesc/descImg/201503/desc04/A0004794664/3997361.jpg\" /></span> \r\n</p>"
					}
			}
		},
		methods:{
			getcontent:function () {
				var url = common.apidomain +'/api/goods/getdesc/'+this.id;
				this.$http.get(url).then(function (res) {
					var data = res.body;
					if(data.status != 0){
						Toast(data.message)
					}
					this.content = data.message[0]
				})
			}
		},
		created:function () {
			this.id = this.$route.params.id;
			this.getcontent()
		}

	}
</script>
<style>
	.centos{
		padding: 5px;
	}
	.tit{
		color: #26a2ff;
		padding: 10px;
	}
	.line{
		height: 1px;
		width: 100%;
		border: 1px solid rgba(0,0,0,0.3)
	}
</style>