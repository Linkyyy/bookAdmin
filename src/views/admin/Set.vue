<template>
    <div class="set">
        <h2>信誉分设置</h2>
        <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="按时归还一次加分">
                <el-input-number v-model="form.inNum" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="逾期一次（7天/次）扣分">
                <el-input-number v-model="form.deNum" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="小于该分数不可借书">
                <el-input-number v-model="form.limitNum" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
            </el-form-item>


        </el-form>

    </div>
</template>

<script>

export default {
    name: 'AdminSet',

    created(){
        let that = this;
        this.$axios.get('/admin/getSet').then(function (response) {
            if (response.data.isSuccess) {
                that.form=response.data.data;
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

    },
    data() {
        return {
            form:{
                deNum:0,
                inNum:0,
                limitNum:0
            }
        }
    },
    methods: {

    }
}
</script>
<style scoped lang="less">
.data {}
</style>