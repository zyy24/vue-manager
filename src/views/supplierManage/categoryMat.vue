<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="categorySearch">
                <el-form-item>
                    <el-input v-model="categorySearch.industryName" placeholder="渠道商类别名称"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getLevel()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-col :span="24" style="border: 1px solid #ebeef5;border-bottom:0">
            <el-button type="primary" @click="dialogFormVisible = true" class="addBtn">添加</el-button>
            <el-dialog title="行业添加" :visible.sync="dialogFormVisible" width="30%">
                <el-form :label-position="labelPosition" label-width="80px" :model="addIndustry" :rules="rules" ref="ruleForm" >
                    <el-form-item label="分类名称" prop="industryName">
                        <el-input v-model="addIndustry.industryName"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="useStatus">
                        <el-radio-group v-model="addIndustry.useStatus" >
                            <el-radio class="radio" :label="1">启用</el-radio>
                            <el-radio class="radio" :label="0">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注"  prop="remark">
                        <el-input type="textarea" v-model="addIndustry.remark"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </div>
            </el-dialog>


        </el-col>
        <!--列表-->

        <el-table :data="list" border v-loading="listLoading"   style="width: 100%;" stripe>
            <el-table-column prop="industryName" label="渠道商类别名称" >
            </el-table-column>
            <el-table-column prop="remark" label="备注" >
            </el-table-column>
            <el-table-column prop="useStatus" label="状态" >
                <template scope="scope">
                   {{scope.row.useStatus ? '可用':'禁用'}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10,15,30,50]"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
            </el-pagination>
        </el-col>

        <!--编辑页面-->
        <el-dialog title="修改" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" width="30%">
            <el-form :model="editForm" label-width="80px"  ref="editForm">
                <el-form-item label="分类名称">
                    <el-input v-model="editForm.industryName"></el-input>
                </el-form-item>
                <el-form-item label="状态" >
                    <el-radio-group v-model="editForm.useStatus">
                        <el-radio class="radio" :label="1">可用</el-radio>
                        <el-radio class="radio" :label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                    <el-form-item label="remark">
                        <el-input type="textarea" v-model="editForm.remark"></el-input>
                    </el-form-item>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible=false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import {getCategoryMat,addCategoryMat,editCategoryMat } from '../../api/api';
    export default {
        data() {
            return {
                categorySearch:{
                    industryName:''
                },
                dialogFormVisible: false,
                labelPosition: 'right',
                listLoading: false,
                addIndustry:{
                    industryName:'',
                    useStatus:'',
                    remark:''
                },
                rules:{
                    industryName:[
                        { required: true, message: '请输入分类名', trigger: 'blur' }
                    ],
                    useStatus:[
                        { required: true, message: '请选择状态', trigger: 'blur' }
                    ],
                },
                list: [],
                sels: [],//列表选中列
                pagination:{
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                //编辑页面默认是否显示
                editFormVisible:false,
                editLoading: false,
                editForm:{
                    industryName:'',
                    useStatus:'',
                    remark:''
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let para={
                            industryName: this.addIndustry.industryName,
                            useStatus: this.addIndustry.useStatus,
                            remark: this.addIndustry.remark
                        };
                        addCategoryMat(para).then((res)=>{

                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
                            this.getLevel();
                            this.$refs.ruleForm.resetFields();
                            console.log(res)
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //(每页多少条)
            handleSizeChange(pageSize){
                this.pagination.pageSize = pageSize;
                this.getLevel();
            },
            //(当前页数)
            handleCurrentChange(current){
                this.pagination.current = current;
                this.getLevel();
            },
            //获取表格数据
            getLevel(){
                let para = {
                    page: this.pagination.current,
                    rows: this.pagination.pageSize,
                    industryName: this.categorySearch.industryName
                };
                getCategoryMat(para).then((res)=>{
                    this.list=res.data.list;

                    this.pagination.total=res.data.count;
                })
            },
            handleEdit:function(index,row){
                this.editFormVisible=true;
                this.editForm=Object.assign({},row)
            },
            editSubmit(){
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.editLoading = true;
                    let para = Object.assign({}, this.editForm);
                    editCategoryMat(para).then((res) => {
                        this.editLoading = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.$refs['editForm'].resetFields();
                        this.editFormVisible = false;
                        this.getLevel();
                    });
                });
            }

        },
        mounted() {
            this.getLevel();
        }
    }

</script>