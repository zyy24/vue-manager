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
                        <el-option label="已到期的用户" value="0"></el-option>
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
            <el-table-column prop="feeId" label="充值编号" min-width="50px">
            </el-table-column>
            <el-table-column prop="supplierName" label="渠道商名称" min-width="120px" >
            </el-table-column>
            <el-table-column prop="realName" label="联系人" >
            </el-table-column>
            <el-table-column prop="levelName" label="账户级别"  sortable>
            </el-table-column>
            <el-table-column prop="createTime" label="充值时间" >
            </el-table-column>
            <el-table-column prop="fee" label="充值金额(元)" >
            </el-table-column>
            <el-table-column prop="validBeginDate" label="充值有效开始">
            </el-table-column>
            <el-table-column prop="validEndDate" label="充值有效结束">
            </el-table-column>
            <el-table-column prop="operator" label="充值客服" min-width="50px">
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
    </section>
</template>

<script>
    import { getRechargeSearchList} from '../../api/api';
    export default {
        data() {
            return {
                rechargeSearch:{
                    supplierName:'',
                    realName:'',
                    flag:''
                },
                list: [],
                pagination:{
                    total: 0,
                    current: 1,
                    pageSize: 10
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
            //获取表格数据
            getRecharge(){
                let para = {
                    page: this.pagination.current,
                    rows: this.pagination.pageSize,

                    supplierName: this.rechargeSearch.supplierName,
                    realName: this.rechargeSearch.realName,
                    flag: this.rechargeSearch.flag
                };
                getRechargeSearchList(para).then((res)=>{
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