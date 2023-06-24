<template>
    <div class="book">
        <div class="container">
            <p class="p_title">
                详情
            </p>
            <div class="div_more">
                <div class="div_item __flex __rsb">
                    <div class="item_left __flex __r">
                        <img :src="item.imgUrl" alt="">
                        <div class="item_info">
                            <p>{{ item.bookName }}</p>
                            <p> <span>作者</span> {{ item.author }} </p>
                            <p> <span>出版社</span> {{ item.publish }}</p>
                            <p> <span>出版时间</span> {{ item.time }}</p>
                            <p> <span>ISBN</span> {{ item.ISBN }}</p>
                            <p> <span>类型</span> <el-tag>{{ item.type }}</el-tag></p>
                        </div>
                    </div>
                    <div class="item_right __flex __csbc">
                        <div class="item_data __flex ">
                            <div class="__flex __ccc">
                                <p>借阅次数</p>
                                <p> {{ item.count }}</p>
                            </div>
                            <div class="__flex __ccc">
                                <p>馆藏</p>
                                <p> {{ item.total }}</p>
                            </div>
                            <div class="__flex __ccc">
                                <p>库存</p>
                                <p> {{ item.number }}</p>
                            </div>

                        </div>
                        <div class="item_op ">
                            <el-button type="primary" @click="handleAddMy">加入书单</el-button>
                        </div>
                    </div>

                </div>
                <div class="div_desc">
                    <p>图书简介</p>
                    <p>{{ item.desc }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { mapState, mapMutations } from 'vuex'


export default {
    name: 'FrontBook',

    created() {
        let that = this;
        this.ISBN = this.$route.query.ISBN;

        console.log(this.ISBN);
        this.$axios.get('/user/getBookInfo', {
            params: {
                ISBN: that.ISBN
            }
        }).then(function (response) {
            if (response.data.isSuccess) {
                that.item = response.data.data[0];
            }
            else {
                ElMessage.error(response.data.message,
                );
            }

        })
            .catch(function (error) {
                console.log(error);
            });
    },
    computed: {
        ...mapState(['isLoading', 'myBookList']),

    },
    data() {
        return {
            item: [
                {
                    ISBN: 'xxxx',
                    bookName: 'xxxxx',
                    imgUrl: 'https://img2.baidu.com/it/u=2497633310,3314440777&fm=253&fmt=auto&app=138&f=JPEG?w=303&h=438',
                    author: 'xxxxx',
                    count: 0,//共借出次数
                    total: 0,//馆藏
                    number: 0,//库存
                    type: 'xxx',
                    time: 'xxx',
                    publish: 'xxxx',
                    desc: 'xxxxxxxxxx'
                },


            ],
        }
    },
    methods: {
        ...mapMutations(['setMyBookList']),

        handleAddMy() {
            let that = this;
            this.$axios.get('/user/add', {
                params: {
                    ISBN: that.ISBN
                }
            }).then(function (response) {
                if (response.data.isSuccess) {
                    ElMessage({
                        message: response.data.message,
                        type: 'success'
                    });
                    that.$forceUpdate();

                }
                else {
                    ElMessage.error(response.data.message,
                    );
                }

            })
                .catch(function (error) {
                    console.log(error);
                });

            this.$axios.get('/user/getMyBookList').then(function (response) {
                if (response.data.isSuccess) {
                    console.log('hahahah');
                    that.setMyBookList(response.data.data);
                }
                else {
                    ElMessage.error(response.data.message);
                }
            })
                .catch(function (error) {
                    console.log(error);
                });
            that.$forceUpdate();

        }
    }
}
</script>
<style scoped lang="less">
.book {

    .container {
        margin: 40px;
        border: 1px solid #DDDDDD;
        border-radius: 5px;

        .p_title {
            padding: 10px;
            font-size: smaller;
            background-color: #F6F6F1;

            span {
                margin: 0 10px;
                color: #409EFF;
            }
        }

        .div_more {
            padding: 30px;

            .div_item {


                img {
                    width: 120px;
                    height: 180px;
                }

                .item_data {
                    div {
                        margin: 10px 10px;
                    }

                    p:nth-child(1) {
                        font-size: small;
                        color: #999999;
                    }

                    p:nth-child(2) {
                        font-size: large;

                    }
                }

                .item_info {
                    margin-left: 20px;

                    p:nth-child(1) {
                        font-weight: bold;
                        color: #3377AA;
                        font-size: larger;


                    }

                    :not(p:nth-child(1)) {
                        span {
                            font-size: smaller;
                            color: #999999;
                        }

                        margin: 10px 0;
                        font-size: small;
                    }
                }
            }

            .div_desc {
                margin: 20px 0;

                p {
                    line-height: 27px;
                }

                p:nth-child(1) {
                    border-bottom: 1px solid #409EFF;
                }

                p:nth-child(2) {
                    margin-top: 10px;
                    font-size: small;
                }
            }
        }


    }

}
</style>