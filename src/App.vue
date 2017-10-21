<!-- 以后项目的根组件 -->
<template>
	<div>
		<!-- 顶部 -->
		<mt-header fixed title="固定在顶部"></mt-header>
		<div class="back" v-if="isshow">
			<a href="javascript:;" @click = "backpage">返回</a>
		</div>
		<!-- 底部 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/Home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/xiaoxi">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">消息</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar/car">
				<span class="mui-icon mui-icon-contact">
					<span class="mui-badge" id="badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shezhi">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
		</nav>

		<!-- 路由占位符 -->
		<router-view></router-view>
		
	</div>
</template>

<script>
	import {vm,COUNTSTR} from './kits/vm.js';
	// 利用 vm.$on() 来注册 COUNT这个常量代表的事件
	vm.$on(COUNTSTR,function(count){
//		1.0 将count值追加到购物车中
		var badgeobj = document.querySelector('#badge');
		badgeobj.innerText = parseInt(badgeobj.innerText) + count;
	});


	export default{  // es6的导出对象的写法


		data(){  //等价于 es5的 data:function(){
			return {
				isshow : false,
			}
		},
		watch:{
			'$route':function (newroute,oldroute) {
				if(newroute.path.toLowerCase() == '/home'){
					console.log(1)
					this.isshow = false;
				}else{
					console.log(2)
					this.isshow = true;
				}
			}
		},
		methods:{
			backpage:function () {
				this.$router.go(-1)
			}
		},
		created(){

		}
	}
</script>

<style scoped>
/*当前页面的css样式写到这里，其中scoped表示这个里面写的css代码只是在当前组件页面上有效，不会去影响到其他组件页面*/
	.back{
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 999;
	}
	.back a{
		color: #fff;
	}
</style>