<template>
    <div class="data">
        <div class="container">
            <div>
                <h2>用户数据</h2>
                <div class="layout_book __flex __rc">
                    <div class="dataItem __bg_color_orange">
                         <span>{{ sNumber.totalUser }}</span> 用户总数
                    </div>
                    <div class="dataItem __bg_color_common">
                        <span>{{ sNumber.newUser }}</span> 人昨日新增
                    </div>
                </div>
            </div>
            <div>
                <h2>图书数据</h2>
                <div class="layout_book __flex __rc">
                    <div class="dataItem __bg_color_blue">
                        <span>{{ sNumber.bookNums }}</span> 图书总数
                    </div>
                    <div class="dataItem __bg_color_green">
                        <span>{{sNumber.InLibrary}}</span> 在馆
                    </div>
                    <div class="dataItem __bg_color_red">
                        <span>{{sNumber.InBorrow}}</span> 借出
                    </div>
                </div>
            </div>
            <div>
                <h2>借阅数据</h2>
                
                <div class="layout_book __flex __rc">
                    <div class="dataItem __bg_color_common">
                        总 <span>{{sNumber.totalBorrow}}</span> 次借出
                    </div>
                    <div class="dataItem __bg_color_common">
                        总 <span>{{sNumber.totalReturn}}</span> 次归还
                    </div>
                    <div class="dataItem __bg_color_common">
                        今日 <span>3</span> 次借出
                    </div>
                    <div class="dataItem __bg_color_common">
                        今日 <span>5</span> 次归还
                    </div>
                </div>
            </div>




        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'AdminData',

    computed: {
        ...mapState(['sNumber'])
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
<style scoped lang="less">
.data {
    .dataItem {
        margin: 0 20px 20px 0;

        border-radius: 10px;
        padding: 15px;
        width: 130px;

        span {
            font: 25px bold;
        }
    }

}
</style>