// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';



// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);


//3.0.2 导入路由规则对应的组件对象
import Home from './components/Home.vue';//主页的导入
import car from './components/shopcar/car.vue';//购物车
import news from './components/news/newslist.vue';//导入新闻列表
import newinfos from './components/news/newinfos.vue';//导入新闻内容
import imgshare from './components/imgshare/imgshare.vue';//图片分享
import imginfos from './components/imgshare/imginfos.vue';//图片分享
import goodspro from './components/goods/goodspro.vue';//商品购买
import goodsinfo from './components/goods/goodsinfo.vue';//商品详情
import goodcentos from './components/goods/goodcentos.vue';//商品详情的图文详解
import goodprocomment from './components/goods/goodprocomment.vue';//商品详情的商品评论


// 3.0.2 定义路由规则
var router1 = new vueRouter({
		linkActiveClass : 'mui-active',
		routes:[
			{path:'/',redirect:'/home'},
			{path:'/home',component:Home},
			{path:'/shopcar/car',component:car},
			{path:'/news/newslist',component:news},
			{path:'/news/newinfos/:id',component:newinfos},
			{path:'/imgshare/allimg',component:imgshare},
			{path:'/imgshare/imginfos/:id',component:imginfos},
			{path:'/goods/goodspro',component:goodspro},
			{path:'/goods/goodsinfo/:id',component:goodsinfo},
			{path:'/goods/goodcentos/:id',component:goodcentos},
			{path:'/goods/goodprocomment/:id',component:goodprocomment},
		]
	});



// 4.0 注册mint-ui
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
// 在Vue中全局使用mintui
Vue.use(mintui);

// 导入resource组件
import VueResource from 'vue-resource';
Vue.use(VueResource)
// 5.0 注册mui的css样式
import '../statics/mui/css/mui.css';
//公用css导入
import '../statics/css/site.css'
// 5.0 利用Vue对象进行解析渲染
import moment from 'moment'
Vue.filter('dataTime',function (input,timeFormate) {
	return moment(input).format(timeFormate)
})
//6.0引用一个Vue集成PhotoSwipe图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

new Vue({
	el:'#app',
	// 使用路由对象实例
	router:router1,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});