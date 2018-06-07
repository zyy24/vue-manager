<template>
    <section>

        <!--查询-->
        <el-row>
            <el-col :span="8" :offset="4" class="toolbar">

                <el-form  label-width="80px" :model="retPsd" :rules="rule" ref="ruleForm" width="50%" >
                    <el-form-item label="原始密码" prop="oldPassword">
                        <el-input type="password" v-model="retPsd.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="retPsd.newPassword"></el-input>
                    </el-form-item>

                    <el-form-item label="确定密码"  prop="conFirmPsd">
                        <el-input type="password" v-model="retPsd.conFirmPsd"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btn" type="primary" @click="onSubmit">确定提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </section>
</template>

<script>
    import {resetPsd} from '../../api/api'
    export default {
        data() {
            var newPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.retPsd.conFirmPsd !== '') {
                        this.$refs.ruleForm.validateField('conFirmPsd');

                    }
                        callback();


                }
            };
            var conFirmPsd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.retPsd.newPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                retPsd:{
                    oldPassword:'',
                    newPassword:'',
                    conFirmPsd:''
                },
                rule:{
                    oldPassword:[
                        { required: true, message: '请输入旧密码', trigger: 'blur' }
                    ],
                    newPassword:[
                        { required: true,validator: newPassword, trigger: 'blur' }
                    ],
                    conFirmPsd:[
                        { required: true,validator: conFirmPsd, trigger: 'blur' }
                    ]
                },

            }
        },
                methods:{
                    onSubmit(){
                        this.$refs.ruleForm.validate((valid) => {
                            if(valid){
                                let para = {
                                    oldpassword:this.retPsd.oldPassword,
                                    newpassword:this.retPsd.newPassword,
                                };

                                resetPsd(para).then((res) => {
                                    if(res.data.result==="success"){
                                        this.$message({
                                            message: '修改成功',
                                            type:'success'
                                        });
                                        this.$refs.ruleForm.resetFields();
                                    }else if(res.data.result==="error"){
                                        this.$message({
                                            message: '修改失败，旧密码错误',
                                        });
                                        this.$refs.ruleForm.resetFields();
                                    }
                                    console.log(res)
                                }).catch(function (err) {
                                })


                            }else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                }

            },
            mounted(){
            }
        }
</script>
<style>
    .btn{
        margin:20px 0 0 210px;

    }
    label.error{
        height: 30px;
    }
</style>