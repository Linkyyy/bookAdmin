<template>
    <div class="index" v-loading.fullscreen.lock="isLoading">
        <el-row class="tac">
            <el-col :span="4">

                <el-menu active-text-color="#ffd04b" background-color="#545c64" :default-openeds="['2']"
                    class="el-menu-vertical-demo layout_menu" :default-active="activeIndex" text-color="#fff"
                    @open="handleOpen" @close="handleClose">
                    <el-menu-item index="1" @click="clickIndex1">
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>首页</span>
                    </el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <icon-menu />

                            </el-icon>
                            <span>管理</span>
                        </template>
                        <el-menu-item index="2-1" @click="clickIndex21">借阅管理</el-menu-item>

                        <el-menu-item index="2-2" @click="clickIndex22">图书管理</el-menu-item>

                        <el-menu-item index="2-3" @click="clickIndex23">用户管理</el-menu-item>

                    </el-sub-menu>
                    <el-menu-item index="3" @click="clickIndex3">
                        <el-icon>
                            <setting />
                        </el-icon>
                        <span>设置</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" class="container">

                <div class="__flex __rsbc">

                    <el-breadcrumb separator="/" class="breadcrumb ">
                        <el-breadcrumb-item @click="clickIndex" :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">{{ item }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-dropdown>
                        <div class="block"><el-avatar :size="40"
                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar></div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="clickDropDownIndex">首页</el-dropdown-item>
                                <el-dropdown-item @click="clickDropDownLogout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>


                <router-view />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getCookie, setCookie } from '../../util/cookie'
import { mapState, mapMutations } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'

import {
    Menu as IconMenu,
    Location,
    Setting,

} from '@element-plus/icons-vue'


export default {
    name: 'AdminIndex',
    components: {
        IconMenu,
        Location,
        Setting,
    },
    created() {
        let isCk = getCookie('username');
        console.log(isCk);
        if (isCk) {
            this.isAdminLogin = true;
        }
        else {
            ElMessage.error(
                '请先登录！');
            this.$router.push('/admin/login')
        }

        let that = this;
        this.$axios.get('/admin/getData').then(function (response) {
            if (response.data.isSuccess) {
                that.setSNumber(response.data.data);
            }
            else {
                ElMessage.error(response.data.message);
            }
        })
            .catch(function (error) {
                console.log(error);
            });


    },
    computed: {
        ...mapState(['isLoading', 'activeIndex', 'breadcrumbList', 'isAdminLogin']),
    },
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations(['setSNumber']),
        clickIndex() {
            this.$router.push({ path: '/admin/' });

        },
        clickIndex1() {
            this.$router.push({ path: '/admin/' });

        },
        clickIndex3() {
            this.$router.push({ path: '/admin/set' });
        },
        clickIndex21() {
            this.$router.push({ path: '/admin/borrow' });
        },
        clickIndex22() {
            this.$router.push({ path: '/admin/book' });

        },
        clickIndex23() {
            this.$router.push({ path: '/admin/user' });

        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        clickDropDownIndex() {
            this.$router.push({ path: '/admin/' });
        },
        clickDropDownLogout() {


            let that=this;
            this.$axios.get('/admin/logout').then(function (response) {
                if (response.data.isSuccess) {
                    that.isAdminLogin = false;
                    that.$router.push({ path: '/admin/login' });
                    ElMessage({
                        message: '退出成功！',
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



        }
    }
}
</script>
<style scoped lang="less">
.index {

    .tac {

        .layout_menu {
            min-height: 100vh;
            height: 100%;
            padding: 20px 0;
        }

        .container {
            padding: 30px;
        }
    }
}
</style>