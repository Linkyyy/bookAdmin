<template>
    <div class="rr">
        <div class="menu __flex __rsbc">
            <button class="button" @click="this.$router.push('/index')">首页</button>

            <button class="dropdown" @click="this.$router.push('/login')">登录</button>

        </div>
        <div class="register __flex __rcc">
            <div class="container ">
                <p class="p_title __flex __rcc">
                    注册
                </p>
                <div class="div_login __flex __ccc">
                    <el-icon size="26px">
                        <Document />
                    </el-icon>
                    <el-form class="__flex __c" ref="form" :model="form" :rules="rules" v-if="!isLogin">

                        <el-form-item class="__flex __rcc" label="姓名" prop="name">
                            <el-input v-model="form.name" placeholder=""></el-input>
                        </el-form-item>

                        <el-form-item class="__flex __rcc" label="电话" prop="telephone">
                            <el-input v-model="form.telephone" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item class="__flex __rcc" label="地址" prop="adress">
                            <el-input v-model="form.adress" placeholder=""></el-input>
                        </el-form-item>


                        <el-form-item class="__flex __rcc" label="身份证号" prop="sfz">
                            <el-input v-model="form.sfz" placeholder=""></el-input>
                        </el-form-item>

                        <el-form-item class="__flex __rcc" label="设置密码" prop="password">
                            <el-input type="password" v-model="form.password" placeholder=""></el-input>
                        </el-form-item>

                        <el-form-item class="__flex __rcc" label="确认密码" prop="passwordA">
                            <el-input type="password" v-model="form.passwordA" placeholder=""></el-input>
                        </el-form-item>

                        <el-form-item class="__flex __ccc">
                            <el-button type="primary" @click="handleSubmit('form')">提交</el-button>
                        </el-form-item>

                    </el-form>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import { h } from 'vue'
import { Document } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
export default {
    name: 'FrontRegister',

    created() {
        ElMessageBox({
            confirmButtonText: '我已了解',
            message: h('div', null, [
                h('h2', null, '注册前请先了解借阅规则！ '),
                h('p', { style: 'margin-top: 20px' }, '1.初始信誉分为 80 分'),
                h('p', null, '2.逾期一次（7天/次）- 10分 按时归还一次 + 4分'),
                h('p', null, '3.当信誉分小于 60 分  不可线上借书'),
                h('p', null, '4.借书时长按周计算，一次最多借 4 周 '),
                h('p', null, '5.到期之前可在个人中心续租，逾期不可续租 '),

            ]),
        })
        //     ElMessageBox.alert('关于信誉分算法：1.逾期一次（7天/次）   -10分2.按时归还一次  +4分 3.当信誉分小于60分  不可线上借书', '注册前请先了解借阅规则！', {
        //         confirmButtonText: '我已了解',

        //     })
    },
    computed: {

    },
    components: {
        Document
    },
    data() {
        return {
            isLogin: false,
            form: {
                sfz: '',
                name: '',
                adress: '',
                telephone: '',
                password: '',
                passwordA: ''
            },
            rules: {
                sfz: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                adress: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                telephone: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                passwordA: [
                    { required: true, message: '必填', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '必填', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(formName) {
            let that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/user/register', that.form).then(function (response) {
                        console.log(response);
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
.rr {

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

    .register {
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