<template>
    <div class="nav" v-loading.fullscreen.lock="isLoading">
        <div class="menu __flex __rsbc">
            <button class="button" @click="this.$router.push('/index')">首页</button>

            <button v-if="!isUserLogin" class="dropdown" @click="this.$router.push('/login')">登录</button>
            <el-dropdown v-else="isUserLogin" class="dropdown">
                <button class="el-dropdown-link">
                    Hello，{{ myName }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="clickMy1">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="clickMy2">我的书单</el-dropdown-item>
                        <el-dropdown-item @click="clickMy3">退出登录</el-dropdown-item>

                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
        <el-drawer v-model="isOpenDrawer" direction="rtl">
            <template #header>
                <h4>我的书单</h4>
            </template>
            <template #default>
                <div class="layout_rank_item __flex __r" v-for="item in myBookList" :key="item">
                    <img :src="item.imgUrl" alt="" @click="handleBook(item)">
                    <div class="item_info">
                        <p @click="handleBook(item)">{{ item.bookName }}</p>
                        <p> 作者：{{ item.author }} </p>
                        <p>出版社：{{ item.publish }}</p>
                        <div class="__flex __rc">
                            借阅时长：
                            <el-input class="input_duration" v-model="item.duration" type="number" :min="1" :max="4"
                                placeholder=""></el-input>
                            周
                        </div>

                    </div>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">取消</el-button>
                    <el-button type="primary" @click="confirmClick">一键租借</el-button>
                </div>
            </template>
        </el-drawer>
        <el-backtop :right="50" :bottom="50" />
        <el-button v-show="isUserLogin" class="button_myList" size="large" circle @click="clickMy2"><el-icon size="17px"
                color="#409EFF">
                <Reading />
            </el-icon></el-button>

        <router-view />
    </div>
</template>

<script>
import { getCookie, setCookie } from '../../util/cookie'
import { mapState, mapMutations } from 'vuex'
import { ArrowDown, Reading } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'


export default {
    name: 'FrontNav',

    created() {
        let isCk = getCookie('User_sfz');
        let myName = getCookie('nickname');
        if (isCk) {
            this.isUserLogin = true;
            this.myName = myName;
            this.getList();

        }

    },
    computed: {
        ...mapState(['isLoading', 'myBookList']),
    },
    components: {
        ArrowDown,
        Reading
    },
    data() {
        return {
            isOpenDrawer: false,
            isUserLogin: false,
            myName: '',

        }
    },
    methods: {
        ...mapMutations(['setMyBookList']),
        getList() {
            let that = this;
            this.$axios.get('/user/getMyBookList').then(function (response) {
                if (response.data.isSuccess) {
                    that.setMyBookList(response.data.data);
                    that.$forceUpdate();
                }
                else {
                    ElMessage.error(response.data.message);
                }
            })
                .catch(function (error) {
                    console.log(error);
                });
        },
        clickMy1() {
            this.$router.push('/my');
        },
        clickMy2() {
            this.isOpenDrawer = true;
        },
        clickMy3() {
            let that = this;
            this.$axios.get('/user/logout').then(function (response) {
                if (response.data.isSuccess) {
                    that.isUserLogin = false;
                    that.$router.push({ path: '/index' });
                    that.$forceUpdate();
                    ElMessage({
                        message: '退出登录成功！',
                        type: 'success'
                    });

                }
                else {
                    ElMessage.error(response.data.message);
                }
            })
                .catch(function (error) {
                    console.log(error);
                });


            this.$router.push('/login')
        },
        handleBook(book) {
            let { href } = this.$router.resolve({ path: '/book', query: book });
            window.open(href, '_blank');
            // this.$router.push({path:'/book',query:book});
        },
        //一键借阅
        confirmClick() {
            let that = this;
            this.$axios.post('/user/borrow', {
                List: that.myBookList
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
.nav {
    .menu {

        background-color: #F6F6F1;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #E4E7ED;

        button {
            cursor: pointer;
            margin: 0px 20px;
            outline: none;
            background-color: transparent;
            border: none;
            border-radius: 10px;

            &:hover {
                color: white;
                background-color: #5EADFF;
            }
        }

    }

    .layout_rank_item {

        padding: 15px;

        img {
            cursor: pointer;
            width: 80px;
            height: 120px;
        }

        .item_info {
            margin-left: 20px;
            font-size: small;

            .input_duration {
                margin: 0 10px;
                width: 50px;
                height: 25px;

            }

            p:nth-child(1) {
                cursor: pointer;
                font-weight: bold;
                color: #3377AA;
                font-size: medium;

                &:hover {
                    color: #C01111;
                }
            }

            p:not(:nth-child(1)) {
                margin: 10px 0;
            }
        }
    }

    .button_myList {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border: none;
        position: fixed;
        bottom: 50px;
        right: 50px;
    }

}
</style>