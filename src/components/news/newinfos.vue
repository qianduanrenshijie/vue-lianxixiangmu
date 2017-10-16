<template lang="html">
    <div class="temp">
       <div class="title">
            <h4 v-text="info.title"></h4>
            <p>{{info.add_time | dataTime('YYYY-MM-DD')}} {{info.click}}次浏览</p>
        </div>
        <div id="content" v-html="info.content"></div>
        <commtent :id = "id"></commtent>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import commtent from '../subcom/comment.vue'
import commont from '../../kits/common.js'
export default {
    components:{
            commtent  // 10.1 注册评论组件
        },
    data(){
        return {
            id:0,
            info:{}
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.getinfo()
    },
    methods : {
        getinfo:function () {
            var url = commont.apidomain + '/api/getnew/' + this.id;
            this.$http.get(url).then(function (res) {
                var data = res.body;
                if(data.status != 0){
                    Toast(data.message)
                    return
                }
                this.info = data.message[0]
            })

        }
    }
}
</script>

<style scoped lang="css">
    .title h4{
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }

    .title,.content{
        padding: 5px;
    }
</style>
