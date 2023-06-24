<template>
    <div class="book">
        <el-button class="button_add" type="primary" @click="handleAdd">添加图书</el-button>
        <el-table class="table" :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template #default="props">

                    <div class="__flex __rcc">
                        <img class="img" :src="props.row.imgUrl" alt="">

                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="书名">
                                <span>{{ props.row.bookName }}</span>
                            </el-form-item>
                            <el-form-item label="类型">
                                <span>{{ props.row.type }}</span>
                            </el-form-item>
                            <el-form-item label="简介">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                        </el-form>
                    </div>





                </template>
            </el-table-column>
            <el-table-column label="ISBN" prop="ISBN">
            </el-table-column>
            <el-table-column label="书名" prop="bookName">
            </el-table-column>
            <el-table-column label="作者" prop="author">
            </el-table-column>
            <el-table-column label="出版社" prop="publish">
            </el-table-column>
            <el-table-column label="库存" prop="number" width="60">
            </el-table-column>
            <el-table-column label="借出数" prop="count" width="60">
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination layout="total,prev, pager, next,sizes" :page-size="pageSize" @size-change="handleSizeChange"
            :page-sizes="[10, 20, 50, 100]" :total="sNumber.totalBooks" @current-change="changePage">
        </el-pagination>

        <el-dialog v-model="dialogFormVisible" :title="DialogOpType == 'add' ? '添加图书' : '编辑图书'">
            <el-form :model="form">
                <el-row>
                    <el-form-item label="ISBN">
                        <el-input v-model="form.ISBN" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="书名">
                        <el-input v-model="form.bookName" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input v-model="form.author" autocomplete="off" />
                    </el-form-item>
                </el-row>

                <el-row :gutter="10">

                    <el-form-item label="类型">
                        <el-input v-model="form.type" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="出版社">
                        <el-input v-model="form.publish" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="库存">
                        <el-input v-model="form.number" autocomplete="off" />
                    </el-form-item>
                </el-row>


                <el-form-item label="简介">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.desc" autocomplete="off" />
                </el-form-item>




                <el-form-item label="图片">
                    <div class="up_img __flex __rcc">
                        <img v-show="imageUrl" :src="imageUrl" />
                        <el-icon v-show="!imageUrl" class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                        <el-upload class="avatar-uploader" name="filename" :action="upImgUrl" :show-file-list="false"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <div class="avatar">

                            </div>
                        </el-upload>
                    </div>

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
import config from '../../config'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { mapState } from 'vuex'


export default {
    name: 'AdminBook',

    components: {
        Plus,

    },
    // beforeRouteEnter(to, from, next) {
    //     //第一个参数to，包含的内容是切换后的路由对象，也就是跳转后的路由对象
    //     //第二个参数from，包含的内容的是切换前的路由对象，也就是跳转前的路由对象
    //     //第三个参数next()，是否往下执行，执行的话，如果不写的话路由就不会跳转，操作将会终止


    // },
    created() {

        this.upImgUrl = config.baseUrl + '/admin/uploadImg'
        this.getList();


    },

    computed: {
        ...mapState(['sNumber'])
    },
    data() {
        return {
            imageUrl: '',
            currentPage: 1,
            pageSize: 10,
            tableData: [{
                ISBN: '9787537467011',
                bookName: '一九八四',
                imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp497651543.jpg&refer=http%3A%2F%2Fimg2.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1678629060&t=e019c4bac8dfc9cd24f9a3dad308b225',
                author: '乔治·奥威尔',
                number: 3,
                type: '欧美文学',
                time: '1949',
                publish: '民主与建设出版社',
                desc: '在《一九八四》里，乔治·奥威尔为我们展现了他惊人的想象力、伟大的创造力、深邃的洞察力，用他独有的风格和高超的技巧为我们描绘了一个泯灭亲情、爱情、人性的恐怖世界。'
            }],
            dialogFormVisible: false,
            form: {
            },
        }
    },
    methods: {
        getList() {
            let that = this;
            this.$axios.get('/admin/getBookList', {
                params: {
                    page: that.currentPage,
                    count: that.pageSize,
                }
            }).then(function (response) {
                if (response.data.isSuccess) {
                    that.tableData = response.data.data;
                    console.log(response.data.data);
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
            ElMessageBox.confirm('确定要删除  《' + row.bookName + '》 吗？')
                .then(() => {
                    this.$axios.get('/admin/deleteBook', {
                        params: {
                            ISBN: row.ISBN,
                        }
                    }).then(function (response) {
                        if (response.data.isSuccess) {
                            that.sNumber.totalBooks -= 1;
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

        handleAdd() {
            this.DialogOpType = 'add';
            this.dialogFormVisible = true;
            this.form = [];
            this.imageUrl = '';
        },
        handleEdit(index, row) {
            this.DialogOpType = 'edit';
            this.dialogFormVisible = true;
            this.form = row;
            this.imageUrl = row.imgUrl;

        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                ElMessage.error("上传头像图片只能是 JPG 格式!");
                return;
            }
            if (!isLt2M) {
                ElMessage.error("上传头像图片大小不能超过 2MB!");
                return;
            }

        },
        handleAvatarSuccess(res) {

            this.imageUrl = res.data.imgUrl;
            ElMessage({
                message: response.data.message,
                type: 'success'
            });

        },
        handleDialogSummit() {
            let that = this;

            if (this.DialogOpType == 'edit') {
                this.$axios.post('/admin/updateBook', { ...this.form, imgUrl: that.imageUrl }).then(function (response) {
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
                this.$axios.post('/admin/addBook', { ...this.form, imgUrl: that.imageUrl }).then(function (response) {
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
.book {
    .button_add {
        margin-top: 20px;
    }

    .img {
        border: 1px solid gray;
        padding: 5px;
        width: 100px;
        height: 150px;
        margin: 20px;
        border-radius: 5px;
    }

    .up_img {
        border: 1px solid gray;
        padding: 5px;
        width: 100px;
        height: 150px;
        border-radius: 5px;
        position: relative;

        img {
            z-index: 0;
            width: 100%;
            height: 100%;
        }

        .avatar-uploader {

            div {
                z-index: 999;
                position: absolute;
                width: 100px;
                height: 100%;
                top: 0;
                left: 0;
            }
        }

    }

    .table {
        margin-bottom: 30px;
    }

}
</style>