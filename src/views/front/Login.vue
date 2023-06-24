<template>
    <div class="ll">
        <div class="menu __flex __rsbc">
            <button class="button" @click="this.$router.push('/index')">首页</button>

            <button class="dropdown" @click="this.$router.push('/login')">登录</button>

        </div>
        <div class="login __flex __rcc">
            <div class="container ">
                <p class="p_title __flex __rcc">
                    登陆
                </p>
                <div class="div_login __flex __ccc">
                    <el-icon size="28px">
                        <User />
                    </el-icon>
                    <el-form class="__flex __ccc" ref="form" :model="form" :rules="rules" v-if="!isLogin">

                        <el-form-item class="__flex __rcc" label="账户" prop="username">
                            <el-input v-model="form.username" placeholder="请输入身份证"></el-input>
                        </el-form-item>
                        <el-form-item class="__flex __rcc" label="密码" prop="password">
                            <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
                        </el-form-item>

                        <el-form-item class="__flex __ccc">
                            <el-button type="primary" @click="handleSubmit('form')">登录</el-button>
                        </el-form-item>
                        <el-link type="primary" @click="this.$router.push('/register')">还没账户？点击注册</el-link>
                    </el-form>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getCookie, setCookie } from '../../util/cookie'


export default {
    name: 'FrontLogin',

    created() {

    },
    computed: {
        ...mapState(['myName', 'isUserLogin'])
    },
    components: {
        User
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入身份证', trigger: 'blur' }
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
                    this.$axios.post('/user/login', {
                        sfz: this.form.username,
                        password: this.form.password
                    }).then(function (response) {
                        if (response.data.isSuccess) {
                            ElMessage({
                                message: response.data.message,
                                type: 'success'
                            });
                            setCookie('nickname', response.data.username, 1);
                            that.$router.push('/index');
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
                } else {
                    console.log('表单验证失败')
                }
            })

        }
    }
}
</script>
<style scoped lang="less">
.ll {
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

    .login {
        width: 100%;
        height: 90vh;



        .container {
            margin: 40px 40px 20px 40px;
            border: 1px solid #DDDDDD;
            border-radius: 5px;

            .p_title {
                padding: 10px;
                font-size: smaller;
                background-color: #F6F6F1;
            }

            .div_login {
                background-color: white;
                padding: 20px 60px 10px;
                border-radius: 10px;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

                * {
                    margin: 6px 0px;
                }
            }
        }

    }
}
</style>