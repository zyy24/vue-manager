<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="permissionSearch">
                <el-form-item>
                    <el-input v-model="permissionSearch.namespace" placeholder="namespace"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="permissionSearch.permissionTag" placeholder="权限标签"  clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input  v-model="permissionSearch.createUserId" placeholder="代发机构ID"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="permissionSearch.status" placeholder="可用状态" clearable>
                        <el-option label="可用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click=" getPermission()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-col :span="24" style="border: 1px solid #ebeef5;border-bottom:0">
            <el-button type="primary" @click="dialogFormVisible = true" class="addBtn">添加</el-button>
            <el-dialog title="角色添加" :visible.sync="dialogFormVisible" width="30%">
                <el-form :label-position="labelPosition" label-width="90px" :model="addPermission" :rules="rules" ref="ruleForm" >
                    <el-form-item label="namespace" prop="namespace">
                        <el-input v-model="addPermission.namespace"></el-input>
                    </el-form-item>
                    <el-form-item label="父权限ID" prop="parentPid">
                        <el-input v-model="addPermission.parentPid"></el-input>
                    </el-form-item>
                    <el-form-item label="标签权限" prop="permissionTag">
                        <el-input v-model="addPermission.permissionTag"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="state">
                           <el-radio-group v-model="addPermission.state">
                               <el-radio class="radio" :label="1">可用</el-radio>
                               <el-radio class="radio" :label="2">禁用</el-radio>
                           </el-radio-group>
                    </el-form-item>
                    <el-form-item label="权限备注"  prop="permissionComment">
                        <el-input v-model="addPermission.permissionComment"></el-input>
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
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <!--<el-table-column type="index"  width="60">-->
            <!--</el-table-column>-->
            <el-table-column prop="namespace" label="namespace"  >
            </el-table-column>
            <el-table-column prop="permissionTag" label="权限标签" >
            </el-table-column>
            <el-table-column prop="createUserId" label="代发机构ID" >
            </el-table-column>
            <el-table-column prop="status" label="可用性"  sortable>
                <template scope="scope">
                    {{scope.row.status ? '可用':'禁用'}}
                </template>
            </el-table-column>
            <el-table-column prop="permissionComment" label="权限备注">
            </el-table-column>
            <el-table-column prop="parentPid" label="父权限标签" >
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" sortable>
            </el-table-column>
            <el-table-column label="操作">
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
            <el-form :model="editForm" label-width="90px"  ref="editForm">
                <el-form-item label="namespace">
                    <el-input v-model="editForm.namespace"></el-input>
                </el-form-item>
                <el-form-item label="父权限ID">
                    <el-input v-model="editForm.parentPid"></el-input>
                </el-form-item>
                <el-form-item label="权限标签">
                    <el-input v-model="editForm.permissionTag"></el-input>
                </el-form-item>
                <el-form-item label="状态" >
                    <el-radio-group v-model="editForm.status">
                        <el-radio class="radio" :label="1">可用</el-radio>
                        <el-radio class="radio" :label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="角色备注">
                    <el-input v-model="editForm.permissionComment"></el-input>
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

    import {getPermissionList,getAddPermission,editPermission} from '../../api/api'
    export default {
        data() {
            return {
                permissionSearch:{
                    namespace:'',
                    permissionTag:'',
                    createUserId:'',
                    status:''
                },
                dialogFormVisible: false,
                labelPosition: 'right',
                listLoading: false,
                addPermission:{
                    namespace:'',
                    permissionTag:'',
                    parentPid:'',
                    status:'',
                    permissionComment:''
                },
                rules:{
                    namespace:[
                        { required: true, message: '请输入namespace', trigger: 'blur' }
                    ],
                    permissionTag:[
                        { required: true, message: '请输入权限标签', trigger: 'blur' }
                    ],
                    parentPid:[
                        { required: true, message: '请输入代发机构ID', trigger: 'blur' }
                    ],
                    state:[
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
                    namespace:'',
                    parentPid:'',
                    permissionTag:'',
                    status:'',
                    permissionComment:''
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let para={
                            namespace: this.addPermission.namespace,
                            parentPid:this.addPermission.parentPid,
                            permissionTag: this.addPermission.permissionTag,
                            status: this.addPermission.status,
                            permissionComment:this.addPermission.permissionComment
                        };
                        getAddPermission(para).then((res)=>{
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
                            this.getPermission();
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
                this.getPermission();
            },
            //(当前页数)
            handleCurrentChange(current){
                this.pagination.current = current;
                this.getPermission();
            },
            //获取表格数据
            getPermission(){
                let para = {
                    page: this.pagination.current,
                    rows: this.pagination.pageSize,

                    namespace: this.permissionSearch.namespace,
                    permissionTag: this.permissionSearch.permissionTag,
                    createUserId: this.permissionSearch.createUserId,
                    status: this.permissionSearch.status,
                };
                getPermissionList(para).then((res)=>{
                    this.list=res.data.list;
                    this.pagination.total=res.data.count;
                });
            },
            handleEdit:function(index,row){
                this.editFormVisible=true;
                this.editForm=Object.assign({},row)
            },
            editSubmit(){
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.editLoading = true;
                    let para = Object.assign({}, this.editForm);
                    editPermission(para).then((res) => {
                        this.editLoading = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.$refs['editForm'].resetFields();
                        this.editFormVisible = false;
                        this. getPermission();
                    });
                });
            }
        },
        mounted() {
            this. getPermission();
        }
    }

</script>