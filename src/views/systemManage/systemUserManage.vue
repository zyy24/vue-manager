<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="userSearch">
				<el-form-item>
					<el-input v-model="userSearch.userName" placeholder="用户名"  clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="userSearch.realName" placeholder="真实姓名"  clearable></el-input>
				</el-form-item>

				<el-form-item>
					<el-input  v-model="userSearch.mobile" placeholder="手机号码"  clearable></el-input>
				</el-form-item>
				<el-form-item>
				<el-select v-model="userSearch.useStatus" placeholder="请选择可用状态" clearable>
					<el-option label="可用" value="1"></el-option>
					<el-option label="禁用" value="0"></el-option>
				</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers()">查询</el-button>
				</el-form-item>
			</el-form>

		</el-col>
		<el-col :span="24" style="border: 1px solid #ebeef5;border-bottom:0">
			<el-button type="primary" @click="dialogFormVisible = true" class="addBtn">添加</el-button>
			<el-dialog title="用户添加" :visible.sync="dialogFormVisible" width="30%">
				<el-form :label-position="labelPosition" label-width="80px" :model="addUsers" :rules="rules" ref="ruleForm" >
					<el-form-item label="用户名" prop="userName">
						<el-input v-model="addUsers.userName"></el-input>
					</el-form-item>
					<el-form-item label="真实姓名" prop="realName">
						<el-input v-model="addUsers.realName"></el-input>
					</el-form-item>
					<el-form-item label="密码"  prop="password">
						<el-input type="password" v-model="addUsers.password"></el-input>
					</el-form-item>
					<el-form-item label="手机号码"  prop="mobile">
						<el-input v-model="addUsers.mobile"></el-input>
					</el-form-item>

					<el-form-item label="角色" prop="roleName">
					<el-select v-model="addUsers.roleName" value-key="roleId" @focus="getRole()" placeholder="请选择角色">
						<el-option
								v-for="item in options"
								:key="item.roleId"
								:label="item.roleName"
								:value="item.roleId">
						</el-option>
					</el-select>
				</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitForm()">确 定</el-button>
				</div>
			</el-dialog>


		</el-col>
		<!--列表-->

		<el-table :data="users" border v-loading="listLoading"  @selection-change="selsChange"  style="width: 100%;" stripe>
			<el-table-column prop="userName" label="用户名" >
			</el-table-column>
			<el-table-column prop="realName" label="真实姓名" >
			</el-table-column>
			<el-table-column prop="mobile" label="手机号" >
			</el-table-column>
			<el-table-column prop="useStatus" label="可用性"  sortable>

			</el-table-column>
			<el-table-column prop="roleName" label="角色"  >
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<!--//<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
				</template>
			</el-table-column>
		</el-table>

		<el-col :span="24" class="toolbar">
			<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:page-sizes="[10, 15, 30,50]"
					:page-size="pagination.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
						   :total="pagination.total">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑"  v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" width="30%">
			<el-form :model="editForm"  label-width="80px" :rules="editFormRules" ref="editForm">
				<!--<el-form-item label="用户Id" prop="userId">-->
					<!--<el-input v-model="editForm.userId" auto-complete="off"></el-input>-->
				<!--</el-form-item>-->
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="editForm.userName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名">
					<el-input v-model="editForm.realName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号码">
					<el-input v-model="editForm.mobile" :min="0" :max="200"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="editForm.useStatus">
						<el-radio class="radio" :label="1">启用</el-radio>
						<el-radio class="radio" :label="0">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="角色" prop="userRole">
					<el-select v-model="editForm.roleName" value-key="roleId" @focus="getRole()" placeholder="请选择角色">
						<el-option
								v-for="item in options"
								:key="item.roleId"
								:label="item.roleName"
								:value="item.roleId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="修改密码">
					<el-input type="password" v-model="editForm.password"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

	</section>
</template>

<script>
	import util from '../../common/js/util'
    import { getUserList, editUser ,getSystemManage,getSystemRole} from '../../api/api';
	export default {
		data() {
			return {
                userSearch: {
                    usersName: '',
                    realName: '',
                    mobile:'',
                    useStatus:'',
                },
                dialogFormVisible: false,
                labelPosition: 'right',
                addUsers: {
                    userId:'',
                    userName: '',
                    realName: '',
                    password: '',
					mobile:'',
                    roleName:''
                },
                options:  [] ,
                rules:{
                    userName:[
						{required: true, message: '请输入用户名', trigger: 'blur' }
					],
                    realName:[
                        { required: true, message: '请输入真实姓名',trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    mobile:[
                        { required: true, message: '请输入手机号码', trigger: 'blur' }
                    ],
                    roleName:[
                        { required: true, message: '请选择角色', trigger: 'blur' }
                    ]
			},
				users: [],
                pagination: {
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                listLoading: false,
				sels: [],//列表选中列
                value:'',
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//修改界面数据
                editForm: {
                    userName: '',
                    realName: '',
                    password: '',
                    useStatus:'',
                    mobile:'',
                    roleName:''
                },
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
			}
		},
		methods: {
            getRole(){
                getSystemRole().then((res)=>{
                    this.options=res.data
                }).catch(function (err) {
                    console.log(err);
                });
			},
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let para = {
                            userName: this.addUsers.userName,
                            realName: this.addUsers.realName,
                            password: this.addUsers.password,
                            mobile: this.addUsers.mobile,
                            roleId: this.addUsers.roleName,
                        };

                        getSystemManage(para).then((res) => {
                            console.log(res)
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
                            this.getUsers();
                            this.$refs.ruleForm.resetFields();
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
           			 },
            //设置分页大小
            handleSizeChange(pageSize) {
                this.pagination.pageSize = pageSize;
                this.getUsers();
            },
            //设置页码
            handleCurrentChange (current) {
                this.pagination.current = current;
                this.getUsers();
            },
			//获取用户列表
			getUsers() {
                let para = {
                    page: this.pagination.current,
					rows: this.pagination.pageSize,
					userName:this.userSearch.userName,
                    realName:this.userSearch.realName,
                    mobile:this.userSearch.mobile,
                    useStatus:this.userSearch.useStatus

                };
                getUserList(para).then((res) => {
                    console.log(res)
                    this.pagination.total = res.data.count;
                    this.users = res.data.list;
                    this.listLoading = false;
                })
                    .catch(function (err) {
                        alert(err)
                        console.log(err);
                    });
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
			    this.editForm = Object.assign({}, row);
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.password = this.editForm.password;
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                    done();
            })
            .catch(_ => {});
            },

        },
		mounted() {
			this.getUsers();
        },
	}

</script>

<style>
	.el-dialog__header{
		background: #eeeeee;
	}
	.addBtn{
		margin:10px 0 14px 10px;
	}
	.el-table td,.el-table th{
		text-align: center;
	}
	.el-table th{
		color: #4e4e50;
		font-weight: bold;
	}
</style>