<template>
    <div class="my">
        <div class="container_top">
            <p class="p_title">
                我的
            </p>
            <div>
                <div :class="['item_data __flex __rcc']">
                    <div :class="['__flex', '__ccc', currentIndex == 0 ? 'item0' : '']" @click="clickIndex(0)">
                        <p>借阅记录</p>
                        <p> {{ allBorrow }}</p>
                    </div>
                    <div :class="['__flex', '__ccc', currentIndex == 1 ? 'item1' : '']" @click="clickIndex(1)">
                        <p>已归还</p>
                        <p> {{ notBorrow }}</p>
                    </div>
                    <div :class="['__flex', '__ccc', currentIndex == 2 ? 'item2' : '']" @click="clickIndex(2)">
                        <p>借阅中</p>
                        <p> {{ inBorrow }}</p>
                    </div>
                    <div :class="['__flex', '__ccc', currentIndex == 3 ? 'item3' : '']" @click="clickIndex(3)">
                        <p>逾期未还</p>
                        <p> {{ outBorrow }}</p>
                    </div>
                </div>
            </div>

        </div>
        <div :class="['container_bottom', 'item' + currentIndex]">
            <div class="search_item __flex __rsb" :span="8" v-for="item in showList" :key="item">
                <div class="item_left __flex __r">
                    <img @click="handleBook(item)" :src="item.imgUrl" alt="">
                    <div class="item_info">
                        <p @click="handleBook(item)">{{ item.bookName }}</p>
                        <p> <span>作者</span> {{ item.author }} </p>
                        <p> <span>出版社</span> {{ item.publish }}</p>
                        <p> <span>出版时间</span> {{ item.time }}</p>
                        <p> <span>ISBN</span> {{ item.ISBN }}</p>
                    </div>
                </div>
                <div class="item_right __flex __csbc">
                    <div class="item_data __flex __c">
                        <div class="__flex __rc">
                            <p>借入时间</p>
                            <p> {{ item.borrowTime }}</p>
                        </div>
                        <div class="__flex __rc">
                            <p>借阅时长</p>
                            <p> {{ item.borrowDuration }}天</p>
                        </div>
                        <div class="__flex __rc">
                            <p>借阅状态</p>
                            <el-tag class="tag" :type="item.status == 1 ? 'success' : item.status == 2 ? '' : 'danger'">{{
                                item.status
                                == 1 ? '已归还' : item.status == 2 ? '未归还' : '逾期未还'
                            }}</el-tag>
                        </div>
                    </div>
                    <div class="item_op ">
                        <el-button type="warning" v-show="item.status == 2" @click="handleXu(item.ISBN)">续租7天</el-button>
                        <el-button type="primary" v-show="item.status != 1" @click="handleReturn(item.ISBN)">还书</el-button>

                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'


export default {
    name: 'FrontMy',
    created() {
        this.getList(true);

    },
    computed: {
        allBorrow() {
            return this.bookList.length;
        },
        notBorrow() {
            let arr = this.bookList.filter((value) => {
                return value.status == 1;
            })
            return arr.length;
        },

        inBorrow() {
            let arr = this.bookList.filter((value) => {
                return value.status == 2;
            })
            return arr.length;
        },

        outBorrow() {
            let arr = this.bookList.filter((value) => {
                return value.status == 3;
            })
            return arr.length;
        }
    },
    data() {
        return {
            currentIndex: 0,
            bookList: [
                {
                    ISBN: '9787020002207',
                    bookName: '荒原狼',
                    imgUrl: 'http://cover.duxiu.com/coverNew/CoverNew.dll?iid=6366616967666164656558a0a191a993a697a49f93a49d3137333232383432',
                    author: '（德）赫尔曼·黑塞著；田伟华译',
                    borrowTime: '2023/2/12',
                    time: '1999',
                    borrowDuration: 3,
                    status: 1,
                    publish: '人民文学出版社',
                },

            ],
            showList: []
        }
    },
    methods: {
        getList(flag) {
            let that = this;
            this.$axios.get('/user/getMyBorrowList').then(function (response) {
                if (response.data.isSuccess) {
                    that.bookList = response.data.borrowList;
                    that.$forceUpdate();

                    that.showList = that.bookList;

                }
                else {
                    ElMessage.error(response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        clickIndex(index) {
            this.currentIndex = index;
            if (index == 0) this.showList = this.bookList
            else {
                this.showList = this.bookList.filter((value) => {
                    return value.status == index;
                })
            }

        },
        handleXu(ISBN) {
            let that = this;
            this.$axios.get('/user/reBorrow', {
                params: {
                    ISBN,
                    duration: 7
                }
            }).then(function (response) {
                if (response.data.isSuccess) {
                    ElMessage({
                        message: response.data.message,
                        type: 'success'
                    });
                    that.getList();
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
        handleReturn(ISBN) {
            let that = this;
            this.$axios.get('/user/returnBook', {
                params: {
                    ISBN
                }
            }).then(function (response) {
                if (response.data.isSuccess) {
                    ElMessage({
                        message: response.data.message,
                        type: 'success'
                    });
                    that.getList();
                }
                else {
                    ElMessage.error(response.data.message,
                    );
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
.my {
    .container_top {
        margin: 40px 40px 20px 40px;
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

        .item_data {


            div {
                cursor: pointer;
                margin: 20px;
                width: 80px;
                height: 80px;
                border: 5px solid transparent;
                border-radius: 50px;


            }

            .item0 {
                border-color: #E6A23C;
            }

            .item1 {
                border-color: #13CE66;
            }

            .item2 {
                border-color: #20A0FF;
            }

            .item3 {
                border-color: #FF4949;
            }



            p:nth-child(1) {
                font-size: small;
                color: #999999;
            }

            p:nth-child(2) {
                font-size: large;

            }
        }


    }

    .container_bottom {
        margin: 20px 40px 40px 40px;
        border: 1px solid #DDDDDD;
        border-radius: 5px;

        .search_item {
            padding: 25px;

            &:not(:nth-child(1)) {
                margin-top: 20px;
            }

            &:not(:nth-last-child(1)) {
                border-bottom: 1px solid #DDDDDD;
            }


            img {
                cursor: pointer;
                width: 100px;
                height: 150px;
            }

            .item_data {


                div {
                    margin: 5px 10px;
                }

                p:nth-child(1) {
                    font-size: smaller;
                    color: #999999;
                }

                p:nth-child(2) {
                    margin: 0 10px;
                    font-size: medium;
                }

                .tag {
                    margin: 0 10px;
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
    }

    .item0 {
        border-color: #E6A23C;
    }

    .item1 {
        border-color: #13CE66;
    }

    .item2 {
        border-color: #20A0FF;
    }

    .item3 {
        border-color: #FF4949;
    }


}
</style>