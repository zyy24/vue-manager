<template>
	<section>

		<template>
			<br><br><br>
			<el-button type="primary" v-on:click="getUserRole()">保存</el-button>
			<el-row  :gutter="40">
				<el-col :span="10" class="userTree">
					<h5>用户树</h5>
					<el-form  :model="userForm"  ref="userForm">
						<el-form-item  prop="province">
							<template>
								<el-radio-group v-model="userForm.userId" @change="handleCheckedCitiesChange1">
									<el-radio v-for="(user,index) in userTreeList"  :label="user.userId" :key="index">{{user.userName}}</el-radio>
								</el-radio-group>
							</template>
						</el-form-item>
					</el-form>

				</el-col>
				<el-col :span="10" class="userTree">
					<h5>角色树</h5>
                  <el-form  :model="roleForm"  ref="editForm">
					  <el-form-item  prop="province">
						  <template>
							  <el-checkbox-group v-model="roleForm.roleId" @change="handleCheckedCitiesChange">
								  <el-checkbox v-for="(role,index) in roleTreeList" :label="role.roleId" :key="index">{{role.roleName}}</el-checkbox>
							  </el-checkbox-group>
						  </template>
					  </el-form-item>
				  </el-form>

				</el-col>
			</el-row>

		</template>

	</section>
</template>
<script>
	import { getRoleUser,getRoleTree,getUserAuthor,getUserRoleList } from '../../api/api';
	export default {
        data() {
            return {
                userTreeList: [],
                roleTreeList:[],
                roleForm:{
                    roleId:[]
                },
                userForm:{
					userId:[]
				},
            }
        },
        methods: {
            getUser() {
                getRoleUser().then((res) => {
                   this.userTreeList=res.data.list;
                })
            },
            getRole() {
                getRoleTree().then((res) => {
                    this.roleTreeList=res.data.list;
                })

            },

            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.roleTreeList.length;
            },
            handleCheckedCitiesChange1(value) {
                this.roleForm.roleId=[];
                let  para={userId:this.userForm.userId};
                  getUserRoleList(para).then((res)=>{
                    for(let i=0;i<res.data.list.length;i++){
                        this.roleForm.roleId.push(res.data.list[i].roleId)
					}
				});

                let checkedCount = value.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.userTreeList.length;
            },
            getUserRole(){
                let para={
                    userId:this.userForm.userId,
                    roleIds:this.roleForm.roleId.join(",")
                }
                getUserAuthor(para).then((res)=>{
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
				})
			}
        },
            mounted() {
                this.getUser();
                this.getRole()
            }
        }


</script>

<style scoped>
      h5{
		  color: #555050;
		  font-size: 16px;
		  font-weight: 400;
		  text-align: center;
	  }
	  .el-checkbox-group:first-child .el-checkbox{
		  margin-left: 30px;
		  width: 130px;
	  }
	  .userTree{
		  background: #efefef;
		  margin: 40px 20px 0 20px;
	  }
</style>