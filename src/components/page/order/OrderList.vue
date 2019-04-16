<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>订单列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                  <!--<el-input v-model="shopId	" placeholder="输入店铺id" class="handle-input mr10"   @keyup.enter.native="getData(1)"></el-input>-->
              <el-input v-model="orderNo" placeholder="订单号" class="handle-input mr10"  @keyup.enter.native="getData(1)"></el-input>
              <el-select v-model="orderStatus" placeholder="请选择客户等级">
                <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <el-button type="primary" icon="search" @click="getData(1)">搜索</el-button>
            </div>
           <div class="handle-box add">
               <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
             <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleEdit">新增</el-button>-->
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="userOrder.userId" label="用户ID" align="center"></el-table-column>
                <el-table-column prop="userOrder.id" label="订单ID" align="center"></el-table-column>
                <el-table-column prop="userOrder.orderNo" label="C端用户订单号" align="center"></el-table-column>
                <el-table-column  label="支付状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userOrder.payStatus == '0'">未支付</span>  
                        <span v-else-if="scope.row.userOrder.payStatus == '1'">已支付</span>
                    </template>
                </el-table-column>
                <el-table-column prop="userOrder.logisticNo" label="物流快递单号" align="center"></el-table-column>
                <el-table-column prop="userOrder.logisticTime" label="发货时间" align="center"></el-table-column> 
                <el-table-column  label="订单状态" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userOrder.orderStatus == '0'">预定中</span>  
                        <span v-else-if="scope.row.userOrder.orderStatus == '1'">预定成功</span>
                        <span v-if="scope.row.userOrder.orderStatus == '2'">已发货</span>  
                        <span v-else-if="scope.row.userOrder.orderStatus == '3'">已签收</span>
                        <span v-if="scope.row.userOrder.orderStatus == '4'">已评价</span>  
                        <span v-else-if="scope.row.userOrder.orderStatus == '5'">退货售后申请</span>
                        <span v-else-if="scope.row.userOrder.orderStatus == '6'">取消</span>
                        <span v-else-if="scope.row.userOrder.orderStatus == '7'">退货中</span>
                        <span v-else-if="scope.row.userOrder.orderStatus == '8'">已退货</span>
                    </template>
                </el-table-column>
                <el-table-column prop="userOrder.orderGoodsNum" label="商品数" align="center"></el-table-column>
                <el-table-column prop="userOrder.goodsTotalPrice" label="商品总价" align="center"></el-table-column>
                <el-table-column prop="userOrder.createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-tickets" @click="view(scope.$index,scope.row)">查看详情</el-button>
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="10"
                layout="total,prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 删除提示框 
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>-->
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                total:0,
                shopId:'',
                statusList:[{value:-1,label:"全部订单"},{value:0,label:"预定中"},{value:1,label:"预定成功"},{value:2,label:"已发货"},{value:3,label:"已签收"},
                {value:4,label:"已评价"},{value:5,label:"退货售后申请"},{value:6,label:"取消"},{value:7,label:"退货中"},{value:8,label:"已退货"}
                ],
                orderStatus:-1,
                idx: -1,
                isAdd:false,
                orderNo:''
            }
        },
        created() {
            this.getData(1);
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData(this.cur_page);
            },
            // 获取 easy-mock 的模拟数据
            getData(arr) {
                var filter = {};
                filter.pageNum  = arr;
                filter.pageSize =10;
                filter.shopId = localStorage.getItem('shopId');
                filter.status = this.orderStatus;
                if(this.orderNo!=''){filter.orderNo = this.orderNo}
                this.$ajax.postu(urlA+'shop/purchase/user/booking/list', filter).then((res) => {
                    if (res.msg == "success") {
                       this.tableData = res.data.list;
                       this.total = res.data.total;
                    } else {
                        this.$message({
                        message: res.error,
                        type: 'error'
                        });
                    }
                });
            },
            //查看
            view(index, row){
                console.log(row);
               this.$router.push({ path: '/order_detail',query: {id:row.userOrder.id}})
            },
       
          
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
   .el-button+.el-button a{
        color:#fff;
    }
    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 250px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .add a{
        color: #fff;
        width: 58px;
        height: 30px;
        display: block;
        text-align: center;
        line-height: 30px;
        border-radius: 3px;
        background-color:#409EFF;
    }
    .el-icon-plus{
        line-height:180px;
    }
    .avatar{
        width:180px;
        height:180px;
    }
   
</style>
