<template>
    <div class="user">
        <el-button class="button_add" type="primary" @click="handleAdd">添加用户</el-button>
        <el-table class="table" :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="sfz" label="身份证" width="180">
            </el-table-column>
            <el-table-column prop="telephone" label="电话" width="150">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="250">
            </el-table-column>
            <el-table-column prop="password" label="密码" width="150">
            </el-table-column>
            <el-table-column prop="credit" label="信誉" width="100">
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="total,prev, pager, next,sizes" :page-size="pageSize" @size-change="handleSizeChange"
            :page-sizes="[10, 20, 50, 100]" :total="sNumber.totalUser" @current-change="changePage">
        </el-pagination>

        <el-dialog v-model="dialogFormVisible" :title="DialogOpType == 'add' ? '添加用户' : '编辑用户'">
            <el-form :model="form">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="身份证">
                    <el-input v-model="form.sfz" autocomplete="off" />
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.telephone" autocomplete="off" />
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="信誉">
                    <el-input v-model="form.credit" autocomplete="off" />
                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleDialogSummit">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>


    </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import { mapState } from 'vuex'

export default {
    name: 'AdminUser',

    created() {
        this.getList();
    },

    computed: {
        ...mapState(['sNumber'])
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            tableData: [{
                name: '啦啦啦',
                sfz: '111111111111111111',
                telephone: '12222222222',
                address: '上海市普陀区金沙江路 1518 弄',
                password: 'password',
                credit: 100
            }],
            dialogFormVisible: false,
            form: {
            },
        }
    },
    methods: {
        getList() {
            let that = this;
            this.$axios.get('/admin/getUserList', {
                params: {
                    page: that.currentPage,
                    count: that.pageSize,

                }
            }).then(function (response) {
                if (response.data.isSuccess) {
                    that.tableData = response.data.data;
                }
                else {
                    ElMessage.error(response.data.message);
                }
            })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleAdd() {
            this.DialogOpType = 'add';
            this.dialogFormVisible = true;
            this.form = [];
        },
        handleEdit(index, row) {
            this.DialogOpType = 'edit';
            this.dialogFormVisible = true;
            this.form = row;
        },
        handleDelete(index, row) {
            let that = this;
            ElMessageBox.confirm(`确定要删除用户  ${row.name}  的信息吗？`)
                .then(() => {
                    this.$axios.get('/admin/deleteUser', {
                        params: {
                            sfz: row.sfz,
                        }
                    }).then(function (response) {
                        if (response.data.isSuccess) {
                            that.sNumber.totalUser -= 1;
                            ElMessage({
                                message: response.data.message,
                                type: 'success'
                            });
                            that.getList();
                        }
                        else {
                            ElMessage.error(response.data.message);
                        }
                    })
                        .catch(function (error) {
                            console.log(error);
                        });


                })
                .catch(() => {
                    console.log('取消！');
                })
        },
        changePage(index) {
            let that = this;
            that.currentPage = index;
            that.getList();

        },
        handleSizeChange(val) {
            let that = this;
            this.currentPage = 1;
            this.pageSize = val;
            that.getList();
        },
        handleDialogSummit() {
            let that = this;

            if (this.DialogOpType == 'edit') {
                this.$axios.post('/admin/updateUser', { ...this.form }).then(function (response) {
                    if (response.data.isSuccess) {
                        ElMessage({
                            message: response.data.message,
                            type: 'success'
                        });
                        that.getList();
                        that.dialogFormVisible = false;
                    }
                    else {
                        ElMessage.error(response.data.message);
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else {
                this.$axios.post('/admin/addUser', { ...this.form }).then(function (response) {
                    if (response.data.isSuccess) {
                        ElMessage({
                            message: response.data.message,
                            type: 'success'
                        });
                        that.getList();
                        that.dialogFormVisible = false;
                    }
                    else {
                        ElMessage.error(response.data.message);
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

        },

    }
}
</script>
<style scoped lang="less">
.user {
    .button_add {
        margin-top: 20px;
    }

    .table {
        margin-bottom: 30px;
    }

}
</style>