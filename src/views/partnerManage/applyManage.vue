<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="applySearch">
                <el-form-item>
                    <el-input v-model="applySearch.partnerName" placeholder="合作商名称"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input  v-model="applySearch.linkPhone" placeholder="手机号"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="applySearch.useStatus" placeholder="可用状态" clearable>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getApply()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->

        <el-table :data="roles" border v-loading="listLoading"   style="width: 100%;" stripe>
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <!--<el-table-column type="index"  width="60">-->
            <!--</el-table-column>-->
            <el-table-column prop="partnerName" label="合作商名称" >
            </el-table-column>
            <el-table-column prop="supplierName" label="渠道商公司名称" >
            </el-table-column>
            <el-table-column prop="phone" label="渠道商手机号" >
            </el-table-column>
            <el-table-column prop="checkStatus" label="状态" width="120" sortable>
                <template scope="scope">
                    {{scope.row.checkStatus==2 ? '已同意':'已拒绝'}}
                </template>
            </el-table-column>
            <el-table-column prop="applyTime" label="申请日期">
            </el-table-column>
            <el-table-column prop="serviceLife" label="使用时间">
            </el-table-column>
            <el-table-column label="操作" min-width="120">
                <template scope="scope">
                    <el-button size="small" type="success" ref="btnAgree" @click="handleAgree(scope.$index, scope.row)">同意</el-button>
                    <el-button type="danger" size="small"  ref="btnRef" @click="handleRef(scope.$index, scope.row)">拒绝</el-button>
                    <el-button type="primary" :class="styleDetial" size="small"  @click="detial(scope.$index, scope.row)">详情</el-button>
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
        <!--同意页面-->
        <el-dialog title="同意" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" width="40%">
            <el-form :model="agreeEditForm" label-width="110px"  ref="agreeEditForm">
                <el-form-item label="合作商名称">
                    <el-input disabled v-model="agreeEditForm.partnerName"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input disabled v-model="agreeEditForm.linkMan"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input disabled v-model="agreeEditForm.linkPhone"></el-input>
                </el-form-item>
                <el-form-item label="渠道商名称">
                    <el-input disabled v-model="agreeEditForm.supplierName"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input disabled v-model="agreeEditForm.man"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input disabled v-model="agreeEditForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="申请日期">
                    <el-input disabled v-model="agreeEditForm.applyTime"></el-input>
                </el-form-item>
                <el-form-item label="账户等级">
                    <el-input disabled v-model="agreeEditForm.levelName"></el-input>
                </el-form-item>
                <el-form-item label="使用年限">
                    <el-input disabled v-model="agreeEditForm.serviceLife"></el-input>
                </el-form-item>
                <el-form-item label="合作方操作人员">
                    <el-input disabled v-model="agreeEditForm.partOperator"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible=false">取消</el-button>
                <el-button type="primary" @click="agreeEditSubmit()" >提交</el-button>
            </div>
        </el-dialog>
        <!--拒绝页面-->
        <el-dialog title="拒绝" v-model="editRefVisible" :visible.sync="editRefVisible" :close-on-click-modal="false" width="40%">
            <el-form :model="refEditForm" label-width="110px"  ref="refEditForm">
                <el-form-item label="合作商名称">
                    <el-input disabled v-model="refEditForm.partnerName"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input disabled v-model="refEditForm.linkMan"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input disabled v-model="refEditForm.linkPhone"></el-input>
                </el-form-item>
                <el-form-item label="渠道商名称">
                    <el-input disabled v-model="refEditForm.supplierName"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input disabled v-model="refEditForm.man"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input disabled v-model="refEditForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="申请日期">
                    <el-input disabled v-model="refEditForm.applyTime"></el-input>
                </el-form-item>
                <el-form-item label="账户等级">
                    <el-input disabled v-model="refEditForm.levelName"></el-input>
                </el-form-item>
                <el-form-item label="使用年限">
                    <el-input disabled v-model="refEditForm.serviceLife"></el-input>
                </el-form-item>
                <el-form-item label="合作方操作人员">
                    <el-input disabled v-model="refEditForm.partOperator"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editRefVisible=false">取消</el-button>
                <el-button type="primary" @click="editRefSubmit" >提交</el-button>
            </div>
        </el-dialog>
        <!--详情页面-->
        <el-dialog title="详情" v-model="detailFormVisible" :visible.sync="detailFormVisible" :close-on-click-modal="false" width="40%">
            <el-form :model="detialEditForm" label-width="110px"  ref="agreeEditForm">
                <el-form-item label="合作商名称">
                    <el-input disabled v-model="detialEditForm.partnerName"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input disabled v-model="detialEditForm.linkMan"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input disabled v-model="detialEditForm.linkPhone"></el-input>
                </el-form-item>
                <el-form-item label="渠道商名称">
                    <el-input disabled v-model="detialEditForm.supplierName"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input disabled v-model="detialEditForm.man"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input disabled v-model="detialEditForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="申请结果">
                    <el-input disabled v-model="detialEditForm.checkStatus"></el-input>
                </el-form-item>
                <el-form-item label="申请日期">
                    <el-input disabled v-model="detialEditForm.applyTime"></el-input>
                </el-form-item>
                <el-form-item label="账户等级">
                    <el-input disabled v-model="detialEditForm.levelName"></el-input>
                </el-form-item>
                <el-form-item label="使用年限">
                    <el-input disabled v-model="detialEditForm.serviceLife"></el-input>
                </el-form-item>
                <el-form-item label="合作方操作人员">
                    <el-input disabled v-model="detialEditForm.partOperator"></el-input>
                </el-form-item>
                <el-form-item label="连店易操作人员">
                    <el-input disabled v-model="detialEditForm.sysOperator"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="detailFormVisible=false">关闭</el-button>
            </div>
        </el-dialog>


    </section>
</template>

<script>
    import { getApplyList, getAddRoles,getAgreeMassage,getUseStatus,getUseRefStatus,getRefMassage } from '../../api/api';
    export default {
        data() {
            return {
                styleNone:{
                    none:false,
                },
                styleDetial:{
                    display:true,
                },
                applySearch:{
                    partnerName:'',
                    linkPhone:'',
                    checkStatus:''
                },
                dialogFormVisible: false,
                labelPosition: 'right',
                listLoading: false,
                agreeEditForm:{
                    partnerSupplierId:'',
                    partnerName:'',
                    linkMan:'', linkPhone:'', supplierName:'', man:'', phone:'',applyTime:'',levelName:'',serviceLife:'',partOperator:''

                },
                refEditForm:{
                    partnerSupplierId:'',
                    partnerName:'',
                    linkMan:'', linkPhone:'', supplierName:'', man:'', phone:'',applyTime:'',levelName:'',serviceLife:'',partOperator:''

                },
                detialEditForm:{
                    partnerName:'',
                    linkMan:'', linkPhone:'', supplierName:'', man:'', phone:'',checkStatus:'',applyTime:'',levelName:'',serviceLife:'',partOperator:'',sysOperator:''
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
                editForm:{
                    partnerSupplierId:''
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
                editRefVisible:false,
                detailFormVisible:false
            }
        },
        methods: {
            //(每页多少条)
            handleSizeChange(pageSize){
                this.pagination.pageSize = pageSize;
                this.getApply();
            },
            //(当前页数)
            handleCurrentChange(current){
                this.pagination.current = current;
                this.getApply();
            },
            //获取表格数据
            getApply(){
                let para = {
                    page: this.pagination.current,
                    rows: this.pagination.pageSize,

                    partnerName: this.applySearch.partnerName,
                    linkPhone: this.applySearch.linkPhone,
                    checkStatus: this.applySearch.checkStatus
                };
                getApplyList(para).then((res)=>{

                    this.roles=res.data.list;
                    this.pagination.total=res.data.count;
//                    for(let i=0;i<res.data.list.length;i++){
//                       if(res.data.list[i].checkStatus===1){
//                           this.roles.checkStatus="申请中"
//                       }else if(res.data.list[i].checkStatus===2){
//                            this.roles.checkStatus="已通过"
//                        }else{
//                            this.roles.checkStatus="被拒绝"
//                        }
//
//                    }
                }).catch((err)=>{

                })
            },

          //同意弹框提交
            agreeEditSubmit(){
                let para={
                    partnerSupplierId:this.agreeEditForm.partnerSupplierId,
                    checkStatus:2
                };
                //this.$parent.remove()
                getUseStatus(para).then((res) => {
                    this.editFormVisible=false;
                });
            },
            //同意按钮
            handleAgree:function(index,row){
                let parar = Object.assign({},row);
               let para={
                   partnerSupplierId:parar.partnerSupplierId,
                   checkStatus:2
               };
                this.editFormVisible=true;
                getAgreeMassage(para).then((res)=>{
                    this.agreeEditForm=Object.assign({},res.data);
                      console.log(res);
//                   this.agreeEditSubmit();
//                    this.getApply();
                })

            },
            //拒绝弹框提交
            editRefSubmit(){
                this.editRefVisible=true;
                let par={
                   partnerSupplierId:this.refEditForm.partnerSupplierId,
                   checkStatus:3
               };
               getUseRefStatus(par).then((res) => {
                  // let element=this.$refs.btnAgree;
                  // console.log(element)
                   this.editRefVisible=false;
                   console.log(res);
                   this.editRefVisible=false;
                }).catch(function (err) {
                    console.log(err)
                   this.editRefVisible=false;
               });
            },

            //拒绝按钮
            handleRef: function (index, row) {

                let parar = Object.assign({},row);
                let param={
                    partnerSupplierId:parar.partnerSupplierId,
                    checkStatus:3
                };
                this.editRefVisible=true;
                getRefMassage(param).then((res)=>{
                    this.refEditForm=Object.assign({},res.data)
                    console.log(res);
//                   this.getApply();
                });

            },

            //详情按钮
            detial: function (index, row) {
               let parar=Object.assign({},row);
                let para={
                    partnerSupplierId:parar.partnerSupplierId
                };
               this.detailFormVisible=true;
                getAgreeMassage(para).then((res)=>{
                    this.detialEditForm=Object.assign({},res.data);
                    if(res.data.checkStatus==3){
                        this.detialEditForm.checkStatus='拒绝'
                    }else if(res.data.checkStatus==2){
                        this.detialEditForm.checkStatus='同意'
                    }
                    console.log(res);
                });
            }
        },

        mounted() {
            this.getApply();
        }
    }

</script>
<style>
    /*.none{*/
        /*display:none;*/
    /*}*/
    /*.display{*/
        /*display:none;*/
    /*}*/
</style>