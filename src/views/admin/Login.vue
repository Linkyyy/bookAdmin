<template>
    <div class="login" v-loading.fullscreen.lock="isLoading">
        
        <div class="layout  __flex __ccc">
            <h1>图书后台管理系统</h1>
            <div class="container_login __flex __ccc">
                
                <el-form ref="form" :model="form" :rules="rules" v-if="!isLogin">
                    <el-form-item label="" prop="username">
                        <el-input v-model="form.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item class="__flex __ccc">
                        <el-button type="primary" @click="handleSubmit('form')">登录</el-button>
                    </el-form-item>
                </el-form>
                <h1 v-else>已经登录了哦！</h1>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
    name: 'AdminLogin',
    components: {

    },
    computed: {
        ...mapState(['isLoading','isLogin']),
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //登陆
        handleSubmit(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/admin/login', {
                        username: this.form.username,
                        password: this.form.password
                    }).then(function (response) {
                        console.log(response);
                        if (response.data.isSuccess) {
                            ElMessage({
                                message: response.data.message,
                                type: 'success'
                            });
                            that.isLogin = true;
                            that.$router.push('/admin/index')
                        }
                        else {
                            ElMessage.error(response.data.message,
                            );
                        }

                    })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    console.log('表单验证失败')
                }
            })
        }
    }
}
</script>
<style scoped lang="less">
.login {

    .layout {
        background-color: #324057;
        height: 100vh;
        h1{
            color: white;
        }
        .container_login {
            background-color: white;
            padding: 15px 50px 15px 50px;
            border-radius: 10px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            *{
                margin: 10px 0px;
            }
        }

        .link {
            font-size: smaller;
        }
    }
}
</style>