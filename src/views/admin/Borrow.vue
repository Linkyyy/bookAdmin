<template>
    <div class="borrow">
        <el-table class="table" :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="借阅人" width="120">
            </el-table-column>
            <el-table-column prop="bookName" label="借阅图书" width="250">
            </el-table-column>
            <el-table-column prop="borrowTime" label="借阅时间" width="180">
            </el-table-column>
            <el-table-column prop="duration" label="借阅时长/天" width="120">
            </el-table-column>
            <el-table-column prop="status" label="借阅状态" width="180" :filters="[
                { text: '已归还', value: 1 },
                { text: '未归还', value: 2 },
                { text: '逾期未还', value: 3 },
            ]" :filter-method="filterTag" filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.status == 1 ? 'success' : scope.row.status == 2 ? '' : 'danger'"
                        disable-transitions>{{
                            scope.row.status == 1 ? '已归还' : scope.row.status == 2 ? '未归还' : '逾期未还'
                        }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="total,prev, pager, next,sizes" :page-size="pageSize" @size-change="handleSizeChange"
            :page-sizes="[10, 20, 50, 100]" :total="sNumber.totalBorrow" @current-change="changePage">
        </el-pagination>

        <el-dialog v-model="dialogFormVisible" title="修改" width="320px">
            <el-form :model="form">
                <el-form-item label="借阅状态">
                    <el-select v-model="form.status">
                        <el-option label="已归还" :value="1"></el-option>
                        <el-option label="未归还" :value="2"></el-option>
                        <el-option label="逾期未还" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="借阅时长/天">
                    <el-select v-model="form.duration">
                        <el-option label="7" value="7"></el-option>
                        <el-option label="14" value="14"></el-option>
                        <el-option label="21" value="21"></el-option>
                        <el-option label="27" value="27"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSummit">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'


export default {
    name: 'AdminBorrow',

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
                name: '王小虎',
                bookName: '一九八四',
                borrowTime: '2023/2/10',
                duration: 7,
                status: 1,
            }],
            dialogFormVisible: false,
            form: {
            },
        }
    },
    methods: {
        getList() {
            let that = this;
            this.$axios.get('/admin/getBorrowList', {
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
        handleEdit(index, row) {

            this.dialogFormVisible = true;
            this.form = row;

        },
        handleSummit() {
            let that = this;
            this.$axios.post('/admin/updateBorrow', { id: this.form.id, duration: this.form.duration, status: this.form.status }).then(function (response) {
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
        },
        handleDelete(index, row) {
            let that = this;
            ElMessageBox.confirm(`确定要删除 ${row.name} 借阅 《 ${row.bookName} 》 的记录吗？`)
                .then(() => {
                    this.$axios.get('/admin/deleteBorrow', {
                        params: {
                            id: row.id,
                        }
                    }).then(function (response) {
                        if (response.data.isSuccess) {
                            that.sNumber.totalBorrow -= 1;
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
        filterTag(value, row) {
            return row.status === value;
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
    }
}
</script>
<style scoped lang="less">
.borrow {

    .table {
        margin: 30px 0;
    }
}
</style>