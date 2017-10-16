<template>
	<div class="temp">
		<ul class="mui-table-view">
			<li v-for='item in list' class="mui-table-view-cell mui-media">
				<router-link v-bind="{ to:'/news/newinfos/' + item.id}">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
							{{item.title}}
						<p class='mui-ellipsis'>{{item.zhaiyao}}</p>

						<div class="ft">
                            <span>发表时间:{{item.add_time | dataTime('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span>点击数:{{item.click}}</span>
                        </div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	import commont from '../../kits/common.js'
	export default{
		data(){
			return {
				list:[]
			}
		},
		created(){
			this.getNews();
		},
		methods:{
			getNews:function () {
				var url = commont.apidomain + '/api/getnewslist';
				this.$http.get(url).then(function (res) {
					var dataNew = res.body
					if(dataNew.status != 0){
						Toast(dataNew.message);
						return
					}
					this.list = dataNew.message
				})
			}
		}
	}
</script>
<style>
	.temp .mui-table-view .mui-media-object{
		width:80px;
		height: 80px;
		max-width: 80px;
        line-height: 80px;
	}
	.temp .ft{
        margin-top: 1.5em;
        font-size: 14px;
        color:#0094ff;
    }

    .temp .ft .click{
        margin-left: 20px;
    }
</style>