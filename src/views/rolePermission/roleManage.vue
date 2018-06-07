<template>
    <section>
			<el-col :span="24" class="toolbar">
				<el-form :inline="true" :model="roleSearch">
					<el-form-item>
						<el-input v-model="roleSearch.roleName" placeholder="角色名"  clearable></el-input>
					</el-form-item>
					<el-form-item>
						<el-input v-model="roleSearch.roleTag" placeholder="角色标签"  clearable></el-input>
					</el-form-item>

					<el-form-item>
						<el-input  v-model="roleSearch.createUserId" placeholder="代发机构ID"  clearable></el-input>
					</el-form-item>
					<el-form-item>
						<el-select v-model="roleSearch.status" placeholder="可用状态" clearable>
							<el-option label="可用" value="1"></el-option>
							<el-option label="禁用" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" v-on:click="getRoles()">查询</el-button>
					</el-form-item>
				</el-form>
			</el-col>

		<el-col :span="24" style="border: 1px solid #ebeef5;border-bottom:0">
			<el-button type="primary" @click="dialogFormVisible = true" class="addBtn">添加</el-button>
			<el-dialog title="角色添加" :visible.sync="dialogFormVisible" width="30%">
				<el-form :label-position="labelPosition" label-width="80px" :model="addRoles" :rules="rules" ref="ruleForm" >
					<el-form-item label="角色名" prop="roleName">
						<el-input v-model="addRoles.roleName"></el-input>
					</el-form-item>
					<el-form-item label="角色便签" prop="roleTag">
						<el-input v-model="addRoles.roleTag"></el-input>
					</el-form-item>
					<el-form-item label="状态" prop="status">
						<el-radio-group v-model="addRoles.status" >
							<el-radio class="radio" :label="1">启用</el-radio>
							<el-radio class="radio" :label="0">禁用</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="角色备注"  prop="roleComment">
						<el-input v-model="addRoles.roleComment"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
				</div>
			</el-dialog>


		</el-col>
		<!--列表-->

		<el-table :data="roles" border v-loading="listLoading"   style="width: 100%;" stripe>
			<!--<el-table-column type="selection" width="55">-->
			<!--</el-table-column>-->
			<!--<el-table-column type="index"  width="60">-->
			<!--</el-table-column>-->
			<el-table-column prop="roleName" label="角色名" >
			</el-table-column>
			<el-table-column prop="roleTag" label="角色标签" >
			</el-table-column>
			<el-table-column prop="createUserId" label="代发机构ID" >
			</el-table-column>
			<el-table-column prop="status" label="可用性" width="120" sortable>
				<template scope="scope">
					{{scope.row.status ? '可用':'禁用'}}
				</template>
			</el-table-column>
			<el-table-column prop="roleComment" label="角色备注" >
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间">
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
			<el-form :model="editForm" label-width="80px"  ref="editForm">
				<el-form-item label="角色名">
                     <el-input v-model="editForm.roleName"></el-input>
				</el-form-item>
				<el-form-item label="角色标签">
					<el-input v-model="editForm.roleTag"></el-input>
				</el-form-item>
				<el-form-item label="状态" >
					<el-radio-group v-model="editForm.status">
						<el-radio class="radio" :label="1">可用</el-radio>
						<el-radio class="radio" :label="0">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="角色备注">
					<el-input v-model="editForm.roleComment"></el-input>
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
    import { getRolesList, getAddRoles,editRoles } from '../../api/api';
	export default {
		data() {
			return {
                roleSearch:{
                    roleName:'',
                    roleTag:'',
                    createUserId:'',
                    status:'',
                    roleComment:''
				},
                dialogFormVisible: false,
                labelPosition: 'right',
                listLoading: false,
                addRoles:{
                    roleName:'',
                    roleTag:'',
                    createUserId:'',
                    status:''
				},
			 rules:{
                 roleName:[
                     { required: true, message: '请输入角色名', trigger: 'blur' }
                 ],
                 roleTag:[
                     { required: true, message: '请输入角色标签', trigger: 'blur' }
                 ],
                 status:[
                     { required: true, message: '请选择状态', trigger: 'blur' }
                 ],
             },
                roles: [],
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
                    roleName:'',
                    roleTag:'',
                    createUserId:'',
                    status:''
				}
			}
		},
		methods: {
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                            let para={
                                roleName: this.addRoles.roleName,
                                roleTag: this.addRoles.roleTag,
                                status: this.addRoles.status,
                                roleComment:this.addRoles.roleComment
                            };
							getAddRoles(para).then((res)=>{
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.dialogFormVisible = false;
                                this.getRoles();
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
                this.getRoles();
            },
            //(当前页数)
            handleCurrentChange(current){
                this.pagination.current = current;
                this.getRoles();
            },
			//获取表格数据
            getRoles(){
                let para = {
                    page: this.pagination.current,
                    rows: this.pagination.pageSize,
                    roleName: this.roleSearch.roleName,
                    roleTag: this.roleSearch.roleTag,
                    createUserId: this.roleSearch.createUserId,
                    status: this.roleSearch.status
                };
                getRolesList(para).then((res)=>{
                   this.roles=res.data.list;
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
                    editRoles(para).then((res) => {
                        this.editLoading = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.$refs['editForm'].resetFields();
                        this.editFormVisible = false;
                        this.getRoles();
                    });
                });
			}

		},
        mounted() {
            this.getRoles();
        }
	}

</script>