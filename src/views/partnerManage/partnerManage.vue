<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="partnerSearch">
                <el-form-item>
                    <el-input v-model="partnerSearch.partnerName" placeholder="公司名"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="partnerSearch.linkMan" placeholder="真实姓名"  clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input  v-model="partnerSearch.linkPhone" placeholder="手机"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="partnerSearch.useStatus" placeholder="可用状态" clearable>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getPartner()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-col :span="24" style="border: 1px solid #ebeef5;border-bottom:0">
            <el-button type="primary" @click="getProvinces" class="addBtn">添加</el-button>
            <el-dialog title="合作方账号维护" :visible.sync="dialogFormVisible" width="40%">
                <el-form :label-position="labelPosition" label-width="80px" :model="addPartner" :rules="rules" ref="ruleForm" >
                    <el-form-item label="行业" prop="industryName">
                        <el-select v-model="addPartner.industryName" value-key="industryId" @focus="getIndustry()" placeholder="请选择行业">
                            <el-option
                                    v-for="item in options"
                                    :key="item.industryId"
                                    :label="item.industryName"
                                    :value="item.industryId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合作商" prop="partnerName" placeholder="请输入合作商公司名">
                        <el-input v-model="addPartner.partnerName"></el-input>
                    </el-form-item>

                    <el-form-item label="真实姓名" prop="linkMan" placeholder="请输入合作方真实姓名">
                        <el-input v-model="addPartner.linkMan"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="addPartner.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="passWord">
                        <el-input type="password" v-model="addPartner.passWord"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="linkPhone">
                        <el-input v-model="addPartner.linkPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="启用状态" prop="useStatus">
                        <el-radio-group v-model="addPartner.useStatus" >
                            <el-radio class="radio" :label="1">启用</el-radio>
                            <el-radio class="radio" :label="0">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="省份"  prop="province">
                        <template>
                            <el-checkbox-group v-model="addPartner.province"  @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="keyName in province" :label="keyName" :key="keyName">{{keyName}}</el-checkbox>
                            </el-checkbox-group>
                        </template>
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
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <!--<el-table-column type="index"  width="60">-->
            <!--</el-table-column>-->
            <el-table-column prop="partnerName" label="合作方公司" >
            </el-table-column>
            <el-table-column prop="linkMan" label="联系人" >
            </el-table-column>
            <el-table-column prop="linkPhone" label="手机" >
            </el-table-column>
            <el-table-column prop="useStatus" label="状态" width="120" sortable>
                <template scope="scope">
                    {{scope.row.useStatus ? '可用':'禁用'}}
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建日期">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)" >修改</el-button>
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
        <el-dialog title="修改" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" width="40%">
            <el-form :model="editForm" label-width="80px" :rules="editRules"  ref="editForm">
                <el-form-item label="行业" prop="industryName">
                    <el-select v-model="editForm.industryName" value-key="industryId" @focus="getIndustry()" placeholder="请选择行业">
                        <el-option
                                v-for="item in options"
                                :key="item.industryId"
                                :label="item.industryName"
                                :value="item.industryId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合作商" prop="partnerName" placeholder="请输入合作商公司名">
                    <el-input v-model="editForm.partnerName"></el-input>
                </el-form-item>

                <el-form-item label="真实姓名" prop="linkMan" placeholder="请输入合作方真实姓名">
                    <el-input v-model="editForm.linkMan"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passWord">
                    <el-input v-model="editForm.passWord"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="linkPhone">
                    <el-input v-model="editForm.linkPhone"></el-input>
                </el-form-item>
                <el-form-item label="启用状态" prop="useStatus">
                    <el-radio-group v-model="editForm.useStatus" >
                        <el-radio class="radio" :label="1">启用</el-radio>
                        <el-radio class="radio" :label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="省份"  prop="province">
                    <template>
                        <el-checkbox-group  v-model="editForm.operateProvinces" @change="handleCheckedCitiesChange">
                            <el-checkbox  v-for="keyName in editProvince" :label="keyName" :key="keyName">{{keyName}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-form-item>
            </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible=false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import { getPartnerList, addGetIndustry,getAddPartner,addProvincesName,editPartner } from '../../api/api';
    export default {
        data() {
            var password = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.addPartner.passWord !== '') {
                        this.$refs.ruleForm.validateField('passWord');
                    }
                    callback();
                }
            };
            var passWord = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addPartner.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var editPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.editForm.passWord !== '') {
                        this.$refs.editForm.validateField('passWord');
                    }
                    callback();
                }
            };
            var editPassWord = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.editForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                partnerSearch:{
                    partnerName:'',
                    linkMan:'',
                    linkPhone:'',
                    useStatus:''
                },
                dialogFormVisible: false,
                labelPosition: 'right',
                listLoading: false,
                addPartner:{
                    industryName:'',
                    partnerName:'',
                    linkMan:'',
                    password:'',
                    linkPhone:'',
                    useStatus:'',
                    province:[]
                },

                options:[],
                editProvince:[],
                rules:{
                    industryName:[
                        { required: true, message: '请选择行业', trigger: 'blur' }
                    ],
                    partnerName:[
                        { required: true, message: '请输入合作商品名称', trigger: 'blur' }
                    ],
                    linkMan:[
                        { required: true, message: '请输入真实姓名', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, validator: password, trigger: 'blur' }
                    ],
                    passWord:[
                        { required: true,validator: passWord, trigger: 'blur' }
                    ],
                    linkPhone:[
                        { required: true, message: '请输入联系人手机号', trigger: 'blur' }
                    ],
                    useStatus:[
                        { required: true, message: '请选择状态', trigger: 'blur' }
                    ],

                },
                editRules:{
                    password:[
                        { required: true, validator: editPassword, trigger: 'blur' }
                    ],
                    passWord:[
                        { required: true,validator: editPassWord, trigger: 'blur' }
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
                    partnerName:'',
                    linkMan:'',
                    password:'',
                    linkPhone:'',
                    useStatus:'',
                    operateProvinces:[]
                },
                //复选框
                isIndeterminate: true
            }
        },
        methods: {
            getIndustry(){
                addGetIndustry().then((res)=>{
                    this.options=res.data;
                    console.log(res)
                }).catch(function (err) {
                    console.log(err);
                });
            },
            getProvinces(){
                this.dialogFormVisible = true,
                addProvincesName().then((res)=>{
                    this.province=[];
                    for(let i=0;i<res.data.length;i++){
                        this.province.push(res.data[i].keyName);
                        console.log(res)
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.province.length;
            },
            submitForm() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        let para={
                            industryId: this.addPartner.industryName,
                            partnerName: this.addPartner.partnerName,
                            linkMan: this.addPartner.linkMan,
                            password:this.addPartner.password,
                            linkPhone: this.addPartner.linkPhone,
                            useStatus: this.addPartner.useStatus,
                            operateProvinces:this.addPartner.province.join(",")
                        };
                        getAddPartner(para).then((res)=>{
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.dialogFormVisible=false;
                            this.getPartner();
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
                this.getPartner();
            },
            //(当前页数)
            handleCurrentChange(current){
                this.pagination.current = current;
                this.getPartner();
            },
            //获取表格数据
            getPartner(){
                let para = {
                    page: this.pagination.current,
                    rows: this.pagination.pageSize,

                    partnerName: this.partnerSearch.partnerName,
                    linkMan: this.partnerSearch.linkMan,
                    linkPhone: this.partnerSearch.linkPhone,
                    useStatus: this.partnerSearch.useStatus
                };
                getPartnerList(para).then((res)=>{
                    this.list=res.data.list;
                    addProvincesName().then((res)=>{
                        this.province=[];
                        for(let i=0;i<res.data.length;i++){
                            this.province.push(res.data[i].keyName);

                        }
                        console.log(res)
                    }).catch(function (err) {
                        console.log(err);
                    });
                    this.pagination.total=res.data.count;
                })
            },

            handleEdit:function(index,row){
                this.editFormVisible=true;
                addProvincesName().then((res)=>{
                    this.editProvince=[];
                    for(let i=0;i<res.data.length;i++){
                        this.editProvince.push(res.data[i].keyName);
                        console.log(res)
                    }
                }).catch(function (err) {
                    console.log(err);
                });
                this.editForm=Object.assign({},row);
                this.editForm.operateProvinces=row.operateProvinces.split(',');
                let para = Object.assign({}, this.editForm);
                   this.editForm.passWord=para.password;
            },

            editSubmit(){
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let param = Object.assign({}, this.editForm);

                             let para={
                                 industryId:this.editForm.industryName,
                                 operateProvinces:param.operateProvinces.join(','),
                                 linkMan:param.linkMan,
                                 linkPhone:param.linkPhone,
                                 partnerId:param.partnerId,
                                 password:param.password,
                                 useStatus:param.useStatus,
                                 partnerName:param.partnerName
                             };
                            editPartner(para).then((res) => {
                                this.editLoading = false;
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.editFormVisible = false;
                                this.getPartner();
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        },
        mounted() {
            this.getPartner();
        }
    }

</script>