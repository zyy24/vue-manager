<template>
    <section>

        <!--查询-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" :model="citySearch">
                    <el-form-item>
                        <el-input v-model="citySearch.unitName" placeholder="省市区名"  clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="citySearch.cityCode" placeholder="区号"  clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input  v-model="citySearch.jianPin" placeholder="街道简拼"  clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" v-on:click="getCity()">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <!--添加省市区-->
        <el-row style="border: 1px solid #ebeef5;border-bottom:0">
            <!--添加省-->
            <el-col :span="2" style="border-bottom:0">
                <el-button type="primary" @click="proviceFormVisible= true" class="addBtn">添加省</el-button>
                <el-dialog title="添加省份" :visible.sync="proviceFormVisible" width="30%">
                    <el-form :label-position="labelPosition" label-width="80px" :model="addProvices" :rules="addProvicesRuleForm" ref="addProvices" >
                        <el-form-item label="省份ID" prop="keyId">
                            <el-input v-model="addProvices.keyId"  placeholder="请输入省份ID"></el-input>
                        </el-form-item>
                        <el-form-item label="省名称" prop="keyName">
                            <el-input v-model="addProvices.keyName"  placeholder="请输入省名称"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="proviceFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitProvices('ruleForm')">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>

            <!--添加市-->
            <el-col :span="2" style="border-bottom:0">
            <el-button type="primary" @click="cityFormVisible = true" class="addBtn">添加市</el-button>
            <el-dialog title="添加市" :visible.sync="cityFormVisible" width="30%">
                <el-form :label-position="labelPosition" label-width="80px" :model="addCity" :rules="addCityRuleForm" ref="addCityRuleForm" >
                    <el-form-item label="省份" prop="province">
                        <el-select v-model="addCity.province" value-key="keyId"  placeholder="请选择省份">
                            <el-option
                                    v-for="item in provinceOptions"
                                    :key="item.keyId"
                                    :label="item.keyName"
                                    :value="item.keyId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="城市ID" prop="cityId">
                        <el-input v-model="addCity.cityId"  placeholder="请输入城市ID"></el-input>
                    </el-form-item>
                    <el-form-item label="城市名称" prop="keyName">
                        <el-input v-model="addCity.keyName"  placeholder="请输入城市名称" ></el-input>
                    </el-form-item>
                    <el-form-item label="区号" prop="cityCode">
                        <el-input v-model="addCity.cityCode" placeholder="请输入城市区号"></el-input>
                    </el-form-item>
                    <el-form-item label="邮编" prop="zipCode">
                        <el-input v-model="addCity.zipCode" placeholder="请输入城市邮编"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cityFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitCity('ruleForm')">确 定</el-button>
                </div>
            </el-dialog>
        </el-col>

            <!--添加区-->
            <el-col :span="2" style="border-bottom:0">
                <el-button type="primary" @click="areaFormVisible = true" class="addBtn">添加区</el-button>
                <el-dialog title="添加区" :visible.sync="areaFormVisible" width="30%">
                    <el-form :label-position="labelPosition" label-width="80px" :model="addArea" :rules="addAreaRuleForm" ref="addAreaRuleForm" >
                        <el-form-item label="省份" prop="province">
                            <el-select v-model="addArea.province" value-key="keyId" @change="getProvince()" placeholder="请选择省份">
                                <el-option
                                        v-for="item in provinceOptions"
                                        :key="item.keyId"
                                        :label="item.keyName"
                                        :value="item.keyId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="城市" prop="province">
                            <el-select v-model="addArea.city" value-key="keyId" @change="getCityName()" placeholder="请选择城市">
                                <el-option
                                        v-for="item in cityOptions"
                                        :key="item.keyId"
                                        :label="item.keyName"
                                        :value="item.keyId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="区域ID" prop="cityId">
                            <el-input v-model="addArea.areaId"  placeholder="请输入区域ID"></el-input>
                        </el-form-item>
                        <el-form-item label="区域名称" prop="keyName">
                            <el-input v-model="addArea.keyName"  placeholder="请输入区域名称" ></el-input>
                        </el-form-item>
                        <el-form-item label="区号" prop="cityCode">
                            <el-input v-model="addArea.cityCode" placeholder="请输入区号"></el-input>
                        </el-form-item>
                        <el-form-item label="邮编" prop="zipCode">
                            <el-input v-model="addArea.zipCode" placeholder="请输入区域邮编"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="areaFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitArea('ruleForm')">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>


            <!--添加街道-->
            <el-col :span="2" style="border-bottom:0">
                <el-button type="primary" @click="roadFormVisible = true" class="addBtn">添加街道</el-button>
                <el-dialog title="添加街道" :visible.sync="roadFormVisible" width="30%">
                    <el-form :label-position="labelPosition" label-width="80px" :model="addRoad" :rules="addRoadRulesForm" ref="addRoadRulesForm" >
                        <el-form-item label="省份" prop="city">
                            <el-select v-model="addRoad.province" value-key="keyId" @change="getProvinceForRoad()" placeholder="请选择省份">
                                <el-option
                                        v-for="item in provinceOptions"
                                        :key="item.roleId"
                                        :label="item.keyName"
                                        :value="item.keyId">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="城市" prop="city">
                            <el-select v-model="addRoad.city" value-key="keyId" @change="getCityNameForRoad()" placeholder="请选择城市">
                                <el-option
                                        v-for="item in cityOptions"
                                        :key="item.roleId"
                                        :label="item.keyName"
                                        :value="item.keyId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="区域" prop="area">
                            <el-select v-model="addRoad.area" value-key="keyId" @change="getAreaForRoad()" placeholder="请选择区域">
                                <el-option
                                        v-for="item in areaOptions"
                                        :key="item.roleId"
                                        :label="item.keyName"
                                        :value="item.keyId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="街道ID" prop="roadId">
                            <el-input v-model="addRoad.roadId" placeholder="请输入街道ID" ></el-input>
                        </el-form-item>
                        <el-form-item label="街道名称"  prop="roadName">
                            <el-input v-model="addRoad.keyName" placeholder="请输入街道名称"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="roadFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitStreet()">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>


        <!--表格-->
        <el-table :data="list" border v-loading="listLoading"   style="width: 100%;" stripe>
            <el-table-column prop="unitName" label="省市区名"  >
            </el-table-column>
            <el-table-column prop="keyName" label="街道名称" >
            </el-table-column>
            <el-table-column prop="cityCode" label="区号"  >
            </el-table-column>
            <el-table-column prop="zipCode" label="邮编" sortable>
            </el-table-column>
            <el-table-column prop="useStatus" label="可用性" >
            </el-table-column>
            <el-table-column prop="jianPin" label="街道简拼" sortable>
            </el-table-column>
            <el-table-column label="操作" >
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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

        <!--编辑界面-->
        <el-dialog title="修改" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" width="30%">
            <el-form :model="editForm" label-width="80px"  ref="editForm">
                <el-form-item label="省份" prop="city">
                    <el-select v-model="editForm.province" value-key="keyId" @change="getProvinceForEdit()" placeholder="请选择省份">
                        <el-option
                                v-for="item in provinceOptions"
                                :key="item.keyId"
                                :label="item.keyName"
                                :value="item.keyId">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="城市" prop="city">
                    <el-select v-model="editForm.city" value-key="keyId" @change="getCityNameForEdit()" placeholder="请选择城市">
                        <el-option
                                v-for="item in cityOptions"
                                :key="item.keyId"
                                :label="item.keyName"
                                :value="item.keyId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区域" prop="area">
                    <el-select v-model="editForm.area" value-key="keyId" @change="getAreaForEdit()" placeholder="请选择省份">
                        <el-option
                                v-for="item in areaOptions"
                                :key="item.keyId"
                                :label="item.keyName"
                                :value="item.keyId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="街道">
                    <el-input v-model="editForm.keyName"></el-input>
                </el-form-item>
                <el-form-item label="区域编号">
                    <el-input v-model="editForm.cityCode"></el-input>
                </el-form-item>
                <el-form-item label="区域邮编">
                    <el-input v-model="editForm.zipCode"></el-input>
                </el-form-item>
                <el-form-item label="状态" >
                    <el-radio-group v-model="editForm.useStatus">
                        <el-radio class="radio" :label="1">可用</el-radio>
                        <el-radio class="radio" :label="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    const proviceCityAreaEdit=[];
    import {getCityList,getAddProvince,getAddCity,getAddArea,getAddStreet,getProvinceList,getCityNameList,getAreaList,editAreaList} from '../../api/api'
    export default {
        data() {
            return {
                citySearch:{
                    unitName:'',
                    cityCode:'',
                    jianPin:''
                },
                proviceFormVisible: false,
                cityFormVisible:false,
                areaFormVisible:false,
                roadFormVisible:false,
                labelPosition: 'right',
                listLoading: false,
                value:'',
                addProvices:{
                    keyId:'',
                    keyName:''
                },
                provinceOptions:[],
                cityOptions:[],
                areaOptions:[],
                addCity:{
                    province:'',
                    keyName:'',
                    cityCode:'',
                    zipCode:''
                },
                addArea:{
                    province:'',
                    city:'',
                    areaId:'',
                    keyName:'',
                    cityCode:'',
                    zipCode:''
                },
                addRoad:{
                    province:'',
                    city:'',
                    area:'',
                    roadId:'',
                    roadName:''
                },
                addProvicesRuleForm:{
                    keyId:[
                        { required: true, message: '请输入省份ID', trigger: 'blur' }
                    ],
                    keyName:[
                        { required: true, message: '请输入省份名称', trigger: 'blur' }
                    ]
                },
                addCityRuleForm:{
                    province:[
                        { required: true, message: '请选择省份', trigger: 'blur' }
                    ],
                    cityId:[
                        { required: true, message: '请输入城市Id', trigger: 'blur' }
                    ],
                    keyName:[
                        { required: true, message: '请输入城市名称', trigger: 'blur' }
                    ],
                    cityCode:[
                        { required: true, message: '请输入区号', trigger: 'blur' }
                    ],
                    zipCode:[
                        {required: true, message: '请输入邮编', trigger: 'blur'}
                    ]
                },
                addAreaRuleForm:{
                    province:[
                        { required: true, message: '请选择省份', trigger: 'blur' }
                    ],
                    city:[
                        { required: true, message: '请输入城市Id', trigger: 'blur' }
                    ],
                    areaId:[
                        { required: true, message: '请输入城市Id', trigger: 'blur' }
                    ],
                    areaName:[
                        { required: true, message: '请输入城市名称', trigger: 'blur' }
                    ],
                    cityCode:[
                        { required: true, message: '请输入区号', trigger: 'blur' }
                    ],
                    zipCode:[
                        {required: true, message: '请输入邮编', trigger: 'blur'}
                    ]
                },
                addRoadRulesForm:{
                    province:[
                        { required: true, message: '请选择省份', trigger: 'blur' }
                    ],
                    city:[
                        { required: true, message: '请输入城市', trigger: 'blur' }
                    ],
                    area:[
                        { required: true, message: '请输入区域', trigger: 'blur' }
                    ],
//                    roadId:[
//                        { required: true, message: '请输入街道ID', trigger: 'blur' }
//                    ],
//                    roadName:[
//                        { required: true, message: '请输入街道名称', trigger: 'blur' }
//                    ]
                },
                list: [],
                editFormVisible: false,
                editLoading: false,
                editForm: {
                    province: '',
                    city: '',
                    area: '',
                    keyName: '',
                    cityCode: '',
                    zipCode: ''
                },
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },

                pagination:{
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
            }
        },
        methods: {
            getCity(){
                let para = {
                    page: this.pagination.current,
                    rows: this.pagination.pageSize,
                    unitName: this.citySearch.unitName,
                    cityCode: this.citySearch.cityCode,
                    jianPin: this.citySearch.jianPin
                };
                getCityList(para).then((res)=>{
                    this.list=res.data.list;
                    this.pagination.total=res.data.count;
                })
            },
            //(每页多少条)
            handleSizeChange(pageSize){
                this.pagination.pageSize = pageSize;
                this.getCity();
            },
            //(当前页数)
            handleCurrentChange(current){
                this.pagination.current = current;
                this.getCity();
            },
            submitProvices(){
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.$refs.addProvices.validate((valid) => {
                        if (valid) {
                            let para={
                                keyId: this.addProvices.keyId,
                                keyName: this.addProvices.keyName,
                            };
                            getAddProvince(para).then((res)=>{
                                this.proviceFormVisible=false;
                                console.log(res)
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                })

            },
            getCityName(){
                let para={provinceId: this.addArea.province,};
                getCityNameList(para).then((res)=> {
                    this.cityOptions = res.data;
                })
            },

            getCityNameForRoad(){
                this.addRoad.area='';
                let para={provinceId: this.addRoad.province,};
                getCityNameList(para).then((res)=> {
                    this.cityOptions = res.data;
                    this.getAreaForRoad()
                })
            },
            getAreaForRoad(){
                let para={cityId: this.addRoad.city};
                getAreaList(para).then((res)=>{
                    this.areaOptions=res.data;
                })
            },
            getProvinceForRoad(){
                this.addRoad.city='';
                let para={ provinceId: this.addRoad.province,}
                getProvinceList(para).then((res)=>{
                    this.provinceOptions=res.data;
                    this.getCityNameForRoad()
                })
            },

            getProvince(){
               let para={ provinceId: this.addArea.province,}
                getProvinceList(para).then((res)=>{
                   this.provinceOptions=res.data;
                   this.addArea.city='';
                   this.getCityName();
                })
            },
            submitCity(){
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.$refs.addCityRuleForm.validate((valid) => {
                        if (valid) {
                            let para={
                                parentId: this.addCity.province,
                                keyId:this.addCity.cityId,
                                keyName: this.addCity.keyName,
                                cityCode:this.addCity.cityCode,
                                zipCode:this.addCity.zipCode
                            };
                            getAddCity(para).then((res)=>{
                                this.cityFormVisible=false;
                                console.log(res)
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                })


            },

            submitArea(){
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.$refs.addAreaRuleForm.validate((valid) => {
                        if (valid) {
                            let para={
                                cityId:this.addArea.city,
                                keyId: this.addArea.areaId,
                                keyName: this.addArea.keyName,
                                cityCode:this.addArea.cityCode,
                                zipCode:this.addArea.zipCode
                            };
                            getAddArea(para).then((res)=>{
                                this.areaFormVisible=false
                                console.log(res)
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                })

            },
            submitStreet(){
                this.$refs.addAreaRuleForm.validate((valid) => {
                    this.$refs.addRoadRulesForm.validate((valid) => {
                        if (valid) {
                            let para={
                                areaId: this.addRoad.area,
                                keyId:this.addRoad.roadId,
                                keyName: this.addRoad.keyName,
                            };
                            getAddStreet(para).then((res)=>{
                                this.roadFormVisible=false;
                                this.getCity();
                                console.log(res)
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                });

            },


            getCityNameForEdit(){
                this.editForm.area='';
                let para={provinceId: this.editForm.province,};
                getCityNameList(para).then((res)=> {
                    this.cityOptions = res.data;
                    this. getAreaForEdit ()
                })
            },
            getAreaForEdit (){
                let para={cityId: this.editForm.city};
                getAreaList(para).then((res)=>{
                    this.areaOptions=res.data;
                })
            },
            getProvinceForEdit(){
                this.editForm.city='';
                let para={ provinceId: this.editForm.province,};
                getProvinceList(para).then((res)=>{
                    this.provinceOptions=res.data;
                    this.getCityNameForEdit()
                })
            },


            //显示编辑界面
            handleEdit:function(index,row){
                this.editFormVisible=true;
                this.editForm=Object.assign({},row);
                var proCity=this.editForm.unitName.split('-');
                    this.editForm.province= proCity[0];
                    this.editForm.city= proCity[1];
                    this.editForm.area= proCity[2];
            },
            editSubmit(){
                this.$confirm('确认提交吗？', '提示', {}).then(() => {

                    let para = Object.assign( this.editForm,{cityId:this.editForm.city,areaId:this.editForm.area,proviceId:this.editForm.province,pinYin:''});
                    editAreaList(para).then((res) => {
                        this.editFormVisible = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        console.log(res);

                    });
                });
            }
        },
        mounted(){
            this.getCity();
            this.getProvince()
        }
    }

</script>