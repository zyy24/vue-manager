<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="accountSearch">
                <el-form-item>
                    <el-input v-model="accountSearch.supplierName" placeholder="渠道商名称"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="accountSearch.realName" placeholder="联系人"  clearable></el-input>
                </el-form-item>
                <el-form-item  prop="industryName">
                    <el-select v-model="accountSearch.supplierCategory" clearable value-key="industryId" @focus="industry()" placeholder="请选择行业">
                        <el-option
                                v-for="item in industryOptions"
                                :key="item.industryId"
                                :label="item.industryName"
                                :value="item.industryId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="levelName">
                    <el-select v-model="accountSearch.supplierLevel" clearable value-key="levelId" @focus="level()" placeholder="请选择账户级别">
                        <el-option
                                v-for="item in levelOptions"
                                :key="item.levelId"
                                :label="item.levelName"
                                :value="item.levelId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getAccount()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

         <!--添加页面-->
        <el-col :span="24" style="border: 1px solid #ebeef5;border-bottom:0">
            <el-button type="primary" @click="dialogFormVisible = true" class="addBtn">添加</el-button>
            <el-dialog title="角色添加" :visible.sync="dialogFormVisible" width="40%">
                <el-form :label-position="labelPosition" status-icon label-width="120px" :model="addSupplier" :rules="AddRules" ref="AddRules" >
                    <el-form-item label="渠道商名称" prop="supplierName">
                        <el-input v-model="addSupplier.supplierName"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="realName">
                        <el-input v-model="addSupplier.realName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="addSupplier.password"></el-input>
                    </el-form-item>
                    <el-form-item label="密码确认" prop="passWord">
                        <el-input type="password" v-model="addSupplier.passWord"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input  v-model="addSupplier.mobile"></el-input>
                    </el-form-item>

                        <el-form-item label="渠道商地址"  prop="address">
                            <el-row>
                                <el-col :span="10">
                                    <el-select v-model="addSupplier.province" value-key="keyId" @change="getProvinceForRoad()" placeholder="请选择省份">
                                        <el-option
                                                v-for="item in provinceOptions"
                                                :key="item.roleId"
                                                :label="item.keyName"
                                                :value="item.keyId">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-select v-model="addSupplier.city" value-key="keyId" @change="getCityNameForRoad()" placeholder="请选择城市">
                                        <el-option
                                                v-for="item in cityOptions"
                                                :key="item.roleId"
                                                :label="item.keyName"
                                                :value="item.keyId">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="10">
                                    <el-select v-model="addSupplier.area" value-key="keyId" @change="getAreaForRoad()" placeholder="请选择区域">
                                        <el-option
                                                v-for="item in areaOptions"
                                                :key="item.roleId"
                                                :label="item.keyName"
                                                :value="item.keyId">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="10" :offset="1">
                                    <el-select  v-model="addSupplier.road" value-key="keyId" @focus="getRoadForRoad()" placeholder="请选择街道">
                                        <el-option
                                                v-for="item in roadOptions"
                                                :key="item.roleId"
                                                :label="item.keyName"
                                                :value="item.keyId">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-input v-model="addSupplier.detailAddr" placeholder="请输入详细地址"></el-input>
                            </el-row>
                        </el-form-item>
                    <el-form-item label="渠道商分类"  prop="industryName">
                        <el-select v-model="addSupplier.industryName" clearable value-key="industryId" @focus="industry()" placeholder="请选择行业">
                            <el-option
                                    v-for="item in industryOptions"
                                    :key="item.industryId"
                                    :label="item.industryName"
                                    :value="item.industryId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="渠道商账户级别"  prop="levelName">
                        <el-select v-model="addSupplier.levelName" clearable value-key="levelId" @focus="level()" placeholder="请选择账户级别">
                            <el-option
                                    v-for="item in levelOptions"
                                    :key="item.levelId"
                                    :label="item.levelName"
                                    :value="item.levelId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" prop="checkStatus">
                        <el-radio-group v-model="addSupplier.checkStatus" >
                            <el-radio class="radio" :label="1">启用</el-radio>
                            <el-radio class="radio" :label="0">禁用</el-radio>
                        </el-radio-group>
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
            <el-table-column prop="category" label="渠道" >
            </el-table-column>
            <el-table-column prop="supplierName" label="渠道商" >
            </el-table-column>
            <el-table-column prop="realName" label="联系人" >
            </el-table-column>
            <el-table-column prop="mobile" label="手机" >
            </el-table-column>
            <el-table-column prop="addr" label="地址" width="120" sortable>
            </el-table-column>
            <el-table-column prop="industryName" label="渠道商分类" >
            </el-table-column>
            <el-table-column prop="levelName" label="渠道商账户级别">
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期">
            </el-table-column>
            <el-table-column prop="operator" label="操作人">
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
        <el-dialog title="修改" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" width="40%">
            <el-form :label-position="labelPosition" status-icon label-width="120px" :model="editSupplier" :rules="editRules" ref="editRules" >
                <el-form-item label="渠道商名称" prop="supplierName">
                    <el-input v-model="editSupplier.supplierName"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="realName">
                    <el-input v-model="editSupplier.realName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="editSupplier.password"></el-input>
                </el-form-item>
                <el-form-item label="密码确认" prop="passWord">
                    <el-input type="password" v-model="editSupplier.passWord"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input  v-model="editSupplier.mobile"></el-input>
                </el-form-item>

                <el-form-item label="渠道商地址"  prop="address">
                    <el-row>
                        <el-col :span="10">
                            <el-select v-model="editSupplier.province" value-key="keyName" @change="getEditProvince()" placeholder="请选择省份">
                                <el-option
                                        v-for="item in provinceOptions"
                                        :key="item.keyId"
                                        :label="item.keyName"
                                        :value="item.keyId">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-select v-model="editSupplier.city" value-key="keyName" @change="getEditCityName()" placeholder="请选择城市">
                                <el-option
                                        v-for="item in cityOptions"
                                        :key="item.keyId"
                                        :label="item.keyName"
                                        :value="item.keyId">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-select v-model="editSupplier.area" value-key="keyName" @change="getEditArea()" placeholder="请选择区域">
                                <el-option
                                        v-for="item in areaOptions"
                                        :key="item.keyId"
                                        :label="item.keyName"
                                        :value="item.keyId">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="10" :offset="1">
                            <el-select  v-model="editSupplier.town" value-key="keyName" @focus="getEditRoad()" placeholder="请选择街道">
                                <el-option
                                        v-for="item in roadOptions"
                                        :key="item.keyId"
                                        :label="item.keyName"
                                        :value="item.keyId">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-input v-model="editSupplier.detailAddr" placeholder="请输入详细地址"></el-input>
                    </el-row>
                </el-form-item>
                <el-form-item label="渠道商分类"  prop="industryName">
                    <el-select v-model="editSupplier.industryName" clearable value-key="industryId" @focus="industry()" placeholder="请选择行业">
                        <el-option
                                v-for="item in industryOptions"
                                :key="item.industryId"
                                :label="item.industryName"
                                :value="item.industryId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="渠道商账户级别"  prop="levelName">
                    <el-select v-model="editSupplier.levelName" clearable value-key="levelId" @focus="level()" placeholder="请选择账户级别">
                        <el-option
                                v-for="item in levelOptions"
                                :key="item.levelId"
                                :label="item.levelName"
                                :value="item.levelId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="checkStatus">
                    <el-radio-group v-model="editSupplier.useStatus" >
                        <el-radio class="radio" :label="1">启用</el-radio>
                        <el-radio class="radio" :label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit()">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import { getIndustry, getLevel,getAccountList,addSuppliers,getCityNameList,getAreaList,getProvinceList,editRoadList,editSuppliers } from '../../api/api';
    export default {
        data() {
            var password = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.addSupplier.passWord !== '') {
                        this.$refs.AddRules.validateField('passWord');
                    }
                    callback();
                }
            };
            var passWord = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addSupplier.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var editPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.editSupplier.passWord !== '') {
                        this.$refs.editRules.validateField('passWord');
                    }
                    callback();
                }
            };
            var editPassWord = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.editSupplier.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                accountSearch:{
                    supplierName:'',
                    realName:'',
                    supplierCategory:'',
                    supplierLevel:''
                },
                industryOptions:[],
                levelOptions:[],
                dialogFormVisible: false,
                labelPosition: 'right',
                listLoading: false,
                provinceOptions:[],
                cityOptions:[],
                areaOptions:[],
                roadOptions:[],
                addSupplier:{
                    supplierName:'',
                    realName:'',
                    password:'',
                    passWord:'',
                    mobile:'',
                    industryName:'',
                    levelName:'',
                    checkStatus:'',
                    province:'',
                    city:'',
                    area:'',
                    road:'',
                    detailAddr:''
                },
                editSupplier:{
                    supplierName:'',
                    realName:'',
                    password:'',
                    passWord:'',
                    mobile:'',
                    industryName:'',
                    levelName:'',
                    useStatus:'',
                    province:'',
                    city:'',
                    area:'',
                    town:'',
                    detailAddr:''
                },
                AddRules:{
                    supplierName:[
                        { required: true, message: '请输入渠道商名称', trigger: 'blur' }
                    ],
                    realName:[
                        { required: true, message: '请输入联系人姓名', trigger: 'blur' }
                    ],
                    password:[
                        { required: true,validator: password, trigger: 'blur' }
                    ],
                    passWord:[
                        { required: true,validator:passWord,  trigger: 'blur' }
                    ],

                    mobile:[
                        { required: true, message: '请输入联系人手机号', trigger: 'blur' }
                    ],
                    industryName:[
                        { required: true, message: '请选择行业分类', trigger: 'blur' }
                    ],
                    levelName:[
                        { required: true, message: '请选择账户级别', trigger: 'blur' }
                    ],
                    checkStatus:[
                        { required: true, message: '请选择状态', trigger: 'blur' }
                    ],
                },
                editRules:{
                    supplierName:[
                        { required: true, message: '请输入渠道商名称', trigger: 'blur' }
                    ],
                    realName:[
                        { required: true, message: '请输入联系人姓名', trigger: 'blur' }
                    ],
                    password:[
                        { required: true,validator: editPassword, trigger: 'blur' }
                    ],
                    passWord:[
                        { required: true,validator:editPassWord,  trigger: 'blur' }
                    ],

                    mobile:[
                        { required: true, message: '请输入联系人手机号', trigger: 'blur' }
                    ],
                    industryName:[
                        { required: true, message: '请选择行业分类', trigger: 'blur' }
                    ],
                    levelName:[
                        { required: true, message: '请选择账户级别', trigger: 'blur' }
                    ],
                    checkStatus:[
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
            }
        },
        methods: {

            industry(){
                getIndustry().then((res)=>{
                    this.industryOptions=res.data;
                    console.log(res)
                }).catch(function (err) {
                    console.log(err);
                });
            },
            level(){
                getLevel().then((res)=>{
                    this.levelOptions=res.data;
                    console.log(res)
                }).catch(function (err) {
                    console.log(err);
                });
            },
            //(每页多少条)
            handleSizeChange(pageSize){
                this.pagination.pageSize = pageSize;
                this.getAccount();
            },
            //(当前页数)
            handleCurrentChange(current){
                this.pagination.current = current;
                this.getAccount();
            },

            //省
            getProvinceForRoad(){
                this.addSupplier.city='';
                this.addSupplier.area='';
                this.addSupplier.road='';
                let para={ provinceId: this.addSupplier.province};
                getCityNameList(para).then((res)=>{
                    this.cityOptions = res.data;
                })
            },
            //市
            getCityNameForRoad(){
                this.addSupplier.area='';
                this.addSupplier.road='';
                let para={cityId: this.addSupplier.city};
                getAreaList(para).then((res)=> {
                    this.areaOptions = res.data;
                })
            },
            //区
            getAreaForRoad(){
                this.addSupplier.road='';
                let para={areaId: this.addSupplier.area};
                editRoadList(para).then((res)=>{
                    this.roadOptions=res.data;
                })
            },
            submitForm() {
                this.$refs.AddRules.validate((valid) => {
                    if (valid) {
                        let para={
                            supplierName: this.addSupplier.supplierName,
                            realName: this.addSupplier.realName,
                            password: this.addSupplier.password,
                            mobile: this.addSupplier.mobile,
                            province:this.addSupplier.province,
                            city:this.addSupplier.city,
                            area:this.addSupplier.area,
                            town:this.addSupplier.road,
                            detailAddr:this.addSupplier.detailAddr,
                            supplierCategory: this.addSupplier.industryName,
                            supplierLevel: this.addSupplier.levelName,
                            useStatus: this.addSupplier.checkStatus
                        };
                        addSuppliers(para).then((res)=>{
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                           this.dialogFormVisible=false;
                            this.getAccount();
                            console.log(res)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //获取表格数据
            getAccount(){
                let para = {
                    page: this.pagination.current,
                    rows: this.pagination.pageSize,

                    supplierName: this.accountSearch.supplierName,
                    realName: this.accountSearch.realName,
                    supplierCategory: this.accountSearch.supplierCategory,
                    supplierLevel: this.accountSearch.supplierLevel
                };
                getAccountList(para).then((res)=>{
                    this.list=res.data.list;
                    this.pagination.total=res.data.count;
                })
            },

            //省
            getEditProvince(){
                this.editSupplier.city='';
                this.editSupplier.area='';
                this.editSupplier.town='';
//                let obj = {};
//                obj = this.provinceOptions.find((item)=>{
//                    return item.value === value;
//                });
//                console.log(obj.label);
                let para={ provinceId: this.editSupplier.province};
                getCityNameList(para).then((res)=>{
                    this.cityOptions = res.data;
                })
            },
            //市
            getEditCityName(){
                this.editSupplier.area='';
                this.editSupplier.town='';
                let para={cityId: this.editSupplier.city};
                getAreaList(para).then((res)=> {
                    this.areaOptions = res.data;
                })
            },
            //区
            getEditArea(){
                this.editSupplier.town='';
                let para={areaId: this.editSupplier.area};
                editRoadList(para).then((res)=>{
                    this.roadOptions=res.data;
                })
            },
            handleEdit:function(index,row){
                this.editFormVisible=true;
                this.editSupplier=Object.assign({},row)
                this.editSupplier.passWord= this.editSupplier.password;
            },
            editSubmit(){
                this.$refs.editRules.validate((valid) => {
                    if (valid) {
                    this.editLoading = true;
                    let para = Object.assign( {province:this.editSupplier.province,city:this.editSupplier.city,
                        area:this.editSupplier.area,town:this.editSupplier.town},this.editSupplier);

                    editSuppliers(para).then((res) => {
                        this.editLoading = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.editFormVisible = false;

                    });
                }else{
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            getProvinceList(){
                getProvinceList().then((res)=>{
                   this.provinceOptions=res.data
                })
            },

        },

        mounted() {
            this.getAccount();
            this.getProvinceList();
        }
    }

</script>
<style>
    .el-row {
        margin-bottom: 20px;
    }
    .el-row:last-child{
        margin-bottom: 0px;
    }
</style>