<template>
    <div class="search">
        <div class="container">
            <p class="p_title">
                找到与<span>{{ query.text }}</span> 相关的图书共 {{ resultNumber }} 本
            </p>
            <div>
                <div class="search_item __flex __rsb" :span="8" v-for="item in hotBookList" :key="item">
                    <div class="item_left __flex __r">
                        <img @click="handleBook(item.ISBN)" :src="item.imgUrl" alt="">
                        <div class="item_info">
                            <p @click="handleBook(item.ISBN)">{{ item.bookName }}</p>
                            <p> <span>作者</span> {{ item.author }} </p>
                            <p> <span>出版社</span> {{ item.publish }}</p>
                            <p> <span>出版时间</span> {{ item.time }}</p>
                            <p> <span>ISBN</span> {{ item.ISBN }}</p>
                        </div>
                    </div>
                    <div class="item_right __flex __csbc">
                        <div class="item_data __flex ">
                            <div class="__flex __ccc">
                                <p>库存</p>
                                <p> {{ item.number }}</p>
                            </div>
                            <div class="__flex __ccc">
                                <p>借阅数</p>
                                <p> {{ item.count }}</p>
                            </div>
                        </div>
                        <div class="item_op ">
                            <el-button type="primary" @click="handleAddMy(item.ISBN)">加入书单</el-button>
                        </div>
                    </div>

                </div>

                <div class="div_pagination __flex __rcc">
                    <el-pagination background="#F1F1F1" layout="prev, pager, next" :total="resultNumber"
                        @current-change="changePage" />
                </div>


            </div>

        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { mapState, mapMutations } from 'vuex'


export default {
    name: 'FrontSearch',

    created() {
        this.query = this.$route.query;
        this.getList();

    },
    computed: {

        ...mapState(['isLoading', 'myBookList']),
    },
    data() {
        return {
            currentPage: 1,
            resultNumber: 23,
            hotBookList: [
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
        getList() {
            let that = this;

            this.$axios.get('/user/search', {
                params: {
                    type: that.query.type,
                    content: that.query.text,
                    page: that.currentPage,
                    count: 10,
                }
            }).then(function (response) {
                if (response.data.isSuccess) {
                    that.hotBookList = response.data.bookList;
                    that.resultNumber = response.data.resultNum;
                    window.scrollTo(0, 0);

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
        handleBook(ISBN) {
            let { href } = this.$router.resolve({ path: '/book', query: { ISBN } });
            window.open(href, '_blank');

        },
        changePage(index) {
            let that = this;
            that.currentPage = index;
            that.getList();
        },
        handleAddMy() {
            let that = this;
            this.$axios.get('/user/add', {
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
        handleAddMy(ISBN) {
            let that = this;
            this.$axios.get('/user/add', {
                params: {
                    ISBN
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
            
        }
    }
}
</script>
<style scoped lang="less">
.search {

    .container {
        margin: 20px;
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

        .search_item {
            padding: 15px;

            img {
                cursor: pointer;
                width: 100px;
                height: 150px;
            }

            .item_data {
                div {
                    margin: 10px 10px;
                }

                p:nth-child(1) {
                    font-size: smaller;
                    color: #999999;
                }

                p:nth-child(2) {
                    font-size: large;

                }
            }

            .item_info {
                margin-left: 20px;

                p:nth-child(1) {
                    cursor: pointer;
                    font-weight: bold;
                    color: #3377AA;
                    font-size: larger;


                    &:hover {
                        color: #C01111;
                    }
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

        .div_pagination {
            margin: 40px 0 40px 0;
        }
    }
}
</style>