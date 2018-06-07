<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="rechargeSearch">
                <el-form-item>
                    <el-input v-model="rechargeSearch.supplierName" placeholder="渠道商名称"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="rechargeSearch.realName" placeholder="联系人"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="rechargeSearch.flag" placeholder="请选择用户类型" clearable>
                        <el-option label="已到期用户" value="0"></el-option>
                        <el-option label="未到期用户" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getRecharge()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>


        <!--列表-->

        <el-table :data="list" border v-loading="listLoading"   style="width: 100%;" stripe>
            <el-table-column prop="feeId" min-width="50px" label="充值编号" >
            </el-table-column>
            <el-table-column prop="supplierName" label="渠道商名称" >
            </el-table-column>
            <el-table-column prop="realName" min-width="50px"  label="联系人" >
            </el-table-column>
            <el-table-column prop="mobile" label="渠道商手机号"  sortable>
            </el-table-column>
            <el-table-column prop="levelName" label="渠道商账户级别" >
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="industryName" label="账户类型">
            </el-table-column>
            <el-table-column prop="validEndDate" label="有效期">
            </el-table-column>
            <el-table-column label="操作" min-width="70px" >
                <template scope="scope">
                    <el-button size="small" type="danger" @click="handleEdit(scope.$index, scope.row)">充值</el-button>
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
        <el-dialog title="充值" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false" width="40%">
            <el-form :model="editForm" label-width="110px"  ref="editForm">
                <el-form-item label="渠道商名称" disabled prop="supplierName">
                    <el-input v-model="editForm.supplierName" disabled></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="realName">
                    <el-input v-model="editForm.realName" disabled></el-input>
                </el-form-item>
                <el-form-item label="渠道商账户级别"  prop="levelName">
                    <el-input v-model="editForm.levelName" disabled></el-input>
                </el-form-item>
                <el-form-item label="账户有效期"  prop="validEndDate">
                    <el-input v-model="editForm.validEndDate" disabled></el-input>
                </el-form-item>
                <el-form-item label="充值时间(年)"  prop="year">
                    <el-input v-model="editForm.year"></el-input>
                </el-form-item>
                <el-form-item label="充值金额(元)"  prop="fee">
                    <el-input v-model="editForm.fee" readonly></el-input>
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
    import { getRechargeList,editRecharge} from '../../api/api';
    export default {
        data() {

            return {
                rechargeSearch:{
                    supplierName:'',
                    realName:'',
                    flag:''
                },
                radio2:'',
                list: [],
                listLoading:false,
                dialogFormVisible:false,
                pagination:{
                    total: 0,
                    current: 1,
                    pageSize: 10
                },
                //编辑页面默认是否显示
                editFormVisible:false,
                editLoading: false,
                editForm:{
                    supplierName:'',
                    realName:'',
                    levelName:'',
                    validEndDate:'',
                    year:'',
                    fee:''
                },
            }
        },
        methods: {
            //(每页多少条)
            handleSizeChange(pageSize){
                this.pagination.pageSize = pageSize;
                this.getRecharge();
            },
            //(当前页数)
            handleCurrentChange(current){
                this.pagination.current = current;
                this.getRecharge();
            },
            handleEdit:function(index,row){
                this.editFormVisible=true;
                this.editForm=Object.assign({},row)
            },
            editSubmit(){
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.editLoading = true;
                    let param = Object.assign({year:this.editForm.year}, this.editForm);
                    let para={
                        supplierId:param.supplierId,
                        year:param.year,
                        fee:param.fee,
                        feeId:param.feeId

                    };

                    editRecharge(para).then((res) => {
                        this.editLoading = false;
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.$refs['editForm'].resetFields();
                        this.editFormVisible = false;
                        this.getRecharge();
                    });
                });
            },
            //获取表格数据
            getRecharge(){
                let para = {
                    page: this.pagination.current,
                    rows: this.pagination.pageSize,

                    supplierName: this.rechargeSearch.supplierName,
                    realName: this.rechargeSearch.realName,
                    flag: this.rechargeSearch.flag
                };
                getRechargeList(para).then((res)=>{
                    this.list =res.data.list;
                    this.pagination.total=res.data.count;
                })
            }
        },
        mounted() {
            this.getRecharge();
        }
    }

</script>