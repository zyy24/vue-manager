<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="noRechargeSearch">
                <el-form-item>
                    <el-input v-model="noRechargeSearch.supplierName" placeholder="渠道商名称"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="noRechargeSearch.realName" placeholder="联系人"  clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="noRechargeSearch.flag" placeholder="请选择用户类型" clearable>
                        <el-option label="已到期用户" value="0"></el-option>
                        <el-option label="未到期用户" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getNoRecharge()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->

        <el-table :data="list" border v-loading="listLoading"   style="width: 100%;" stripe>

            <el-table-column prop="supplierName" label="渠道商名称" >
            </el-table-column>
            <el-table-column prop="realName" label="联系人" >
            </el-table-column>
            <el-table-column prop="mobile" label="手机号"  sortable>
            </el-table-column>
            <el-table-column prop="createTime" label="注册时间">
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
    import { getNoRechargeList} from '../../api/api';
    export default {
        data() {
            return {
                noRechargeSearch:{
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
                this.getNoRecharge();
            },
            //(当前页数)
            handleCurrentChange(current){
                this.pagination.current = current;
                this.getNoRecharge();
            },
            //获取表格数据
            getNoRecharge(){
                let para = {
                    page: this.pagination.current,
                    rows: this.pagination.pageSize,

                    supplierName: this.noRechargeSearch.supplierName,
                    realName: this.noRechargeSearch.realName,
                    flag: this.noRechargeSearch.flag
                };
                getNoRechargeList(para).then((res)=>{
                    this.list =res.data.list;
                    this.pagination.total=res.data.count;
                })
            }
        },
        mounted() {
            this.getNoRecharge();
        }
    }

</script>