<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="levelSearch">
                <el-form-item>
                    <el-input v-model="levelSearch.levelName" placeholder="账户级别名称"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getLevel()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-col :span="24" style="border: 1px solid #ebeef5;border-bottom:0">
            <el-button type="primary" @click="dialogFormVisible = true" class="addBtn">添加</el-button>
            <el-dialog title="账户级别添加" :visible.sync="dialogFormVisible" width="30%">
                <el-form :label-position="labelPosition" label-width="110px" :model="addAccountLevel" :rules="rules" ref="ruleForm" >
                    <el-form-item label="账户级别名称" prop="levelName">
                        <el-input v-model="addAccountLevel.levelName"></el-input>
                    </el-form-item>
                    <el-form-item label="年服务费" prop="annualFee">
                        <el-input v-model="addAccountLevel.annualFee"></el-input>
                    </el-form-item>
                    <el-form-item label="业务员个数" prop="courierNum">
                        <el-input v-model="addAccountLevel.courierNum"></el-input>
                    </el-form-item>
                    <el-form-item label="备注"  prop="levelDesc">
                        <el-input v-model="addAccountLevel.levelDesc"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm()">确 定</el-button>
                </div>
            </el-dialog>


        </el-col>
        <!--列表-->

        <el-table :data="list" border v-loading="listLoading"   style="width: 100%;" stripe>
            <el-table-column prop="levelName" label="账户级别名称" >
            </el-table-column>
            <el-table-column prop="annualFee" label="年服务费" >
            </el-table-column>
            <el-table-column prop="courierNum" label="业务员个数" >
            </el-table-column>
            <el-table-column prop="levelDesc" label="备注" >
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
        <el-dialog title="编辑" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" width="30%">
            <el-form :model="editForm" label-width="110px"  ref="editForm">
                <el-form-item label="账户级别名称">
                    <el-input v-model="editForm.levelName"></el-input>
                </el-form-item>
                <el-form-item label="年服务费">
                    <el-input v-model="editForm.annualFee"></el-input>
                </el-form-item>
                <el-form-item label="业务员个数">
                    <el-input v-model="editForm.courierNum"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="editForm.levelDesc"></el-input>
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
    import {getLevelMat,addLevelMat,editLevelMat } from '../../api/api';
    export default {
        data() {
            return {
                levelSearch:{
                    levelName:''
                },
                dialogFormVisible: false,
                labelPosition: 'right',
                listLoading: false,
                addAccountLevel:{
                    levelName:'',
                    annualFee:'',
                    courierNum:'',
                    levelDesc:''
                },
                rules:{
                    levelName:[
                        { required: true, message: '请输入账户级别名称', trigger: 'blur' }
                    ],
                    annualFee:[
                        { required: true, message: '请输入年服务费', trigger: 'blur' }
                    ],
                    courierNum:[
                        { required: true, message: '请输入业务员个数', trigger: 'blur' }
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
                    levelName:'',
                    annualFee:'',
                    courierNum:'',
                    levelDesc:''
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let para={
                            levelName: this.addAccountLevel.levelName,
                            annualFee: this.addAccountLevel.annualFee,
                            courierNum: this.addAccountLevel.courierNum,
                            levelDesc:this.addAccountLevel.levelDesc
                        };
                        addLevelMat(para).then((res)=>{
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
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
                    levelName: this.levelSearch.levelName
                };
                getLevelMat(para).then((res)=>{
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
                    editLevelMat(para).then((res) => {
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