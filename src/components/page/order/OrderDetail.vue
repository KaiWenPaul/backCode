<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i><span @click="goHistory" class="back">返回列表</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">      
     <!-- 订单详情-->
            <el-form :model="orderBeans" label-width="100px" ref="orderBeans">
            <el-form-item label="用户id">
                <el-input v-model="orderBeans.userId" auto-complete="off" disabled style="width:230px;"></el-input>
                <span style="margin-left:42px;margin-right:5px;color:#606266">用户id</span>
                <el-input v-model="orderBeans.userId" placeholder="" style="width:230px;" disabled></el-input>
                <span style="margin-left:42px;margin-right:5px;color:#606266">订单号</span>
                <el-input v-model="orderBeans.orderNo" placeholder="" style="width:230px;" disabled></el-input>
                <span style="margin-left:42px;margin-right:5px;color:#606266">店铺id</span>
                <el-input v-model="orderBeans.shopId" placeholder="" style="width:230px;" disabled></el-input>
            </el-form-item>
            
            <el-form-item label="商品总额">
                <el-input v-model="orderBeans.goodsTotalPrice" placeholder="" style="width:230px;" disabled></el-input>
                 <span style="margin-left:42px;margin-right:5px;color:#606266">订单状态</span>
                 <el-select v-model="orderBeans.orderStatus" placeholder="请选择订单状态" disabled>
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span style="margin-left:42px;margin-right:5px;color:#606266">支付状态</span>
                 <el-select v-model="orderBeans.payStatus" placeholder="请选择支付状态" disabled>
                    <el-option
                        v-for="item in pay_status"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="收货人姓名">
                <el-input v-model="orderBeans.receiveUsername" placeholder="" style="width:150px;" disabled></el-input>
                <span style="margin-left:42px;margin-right:5px;color:#606266">收货人手机号</span>
                <el-input v-model="orderBeans.receiveMobile" placeholder="" style="width:180px;" disabled></el-input>
            </el-form-item>
            <el-form-item label="收货地址: 省">
                <el-input v-model="orderBeans.provinceName" placeholder="" style="width:120px;" disabled>454545</el-input>
                <span style="margin-left:15px;margin-right:5px;color:#606266">市</span>
                <el-input v-model="orderBeans.cityName" placeholder="" style="width:120px;" disabled></el-input>
                <span style="margin-left:15px;margin-right:5px;color:#606266">区</span>
                <el-input v-model="orderBeans.regionName" placeholder="" style="width:120px;" disabled></el-input>
                <span style="margin-left:15px;margin-right:5px;color:#606266">详细地址</span>
                <el-input v-model="orderBeans.receiveAddressDetail" placeholder="" style="width:250px;" disabled></el-input>
            </el-form-item>
            <el-form-item label="订单备注">
                <el-input v-model="orderBeans.remark" placeholder="" style="width:230px;" disabled></el-input>
                 <span style="margin-left:42px;margin-right:5px;color:#606266">发货时间</span>
                <el-date-picker type="date" placeholder="发货时间" v-model="orderBeans.logisticTime " value-format="yyyy-MM-dd" disabled></el-date-picker>
                <span style="margin-left:42px;margin-right:5px;color:#606266">物流快递号</span>
                 <el-input v-model="orderBeans.logisticNo" placeholder="" style="width:230px;" disabled></el-input>
            </el-form-item>
            <el-form-item label="发票类型">
               <el-select v-model="orderBeans.invoiceType" placeholder="请选择发票类型" disabled>
                    <el-option
                        v-for="item in invoiceList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span style="margin-left:15px;margin-right:5px;color:#606266">抬头类型</span>
                 <el-select v-model="orderBeans.invoiceTypeList" placeholder="请选择抬头类型" disabled>
                    <el-option
                        v-for="item in invoiceList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发票抬头">
                <el-input v-model="orderBeans.invoiceCompanyName" placeholder="" style="width:200px;" disabled></el-input>
                <span style="margin-left:42px;margin-right:5px;color:#606266">纳税人识别码</span>
                <el-input v-model="orderBeans.inviseTaxpayerCode" placeholder="" style="width:180px;" disabled></el-input>
                 <span style="margin-left:42px;margin-right:5px;color:#606266">开户银行</span>
                <el-input v-model="orderBeans.inviseBankName" placeholder="" style="width:180px;" disabled></el-input>
            </el-form-item>
             <el-form-item label="银行账号">
                <el-input v-model="orderBeans.inviseBankCode" placeholder="" style="width:200px;" disabled></el-input>
                <span style="margin-left:42px;margin-right:5px;color:#606266">注册电话</span>
                <el-input v-model="orderBeans.inviseRegisterPhone" placeholder="" style="width:180px;" disabled></el-input>
                 <span style="margin-left:42px;margin-right:5px;color:#606266">注册地址</span>
                <el-input v-model="orderBeans.inviseRegisterAddress" placeholder="" style="width:250px;" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司注册时间">
                <el-input v-model="orderBeans.inviseRegisterTime" placeholder="" style="width:200px;" disabled></el-input>
                <span style="margin-left:42px;margin-right:5px;color:#606266">发票内容</span>
                <el-input v-model="orderBeans.invoiceContent" placeholder="" style="width:250px;" disabled></el-input>
                <span style="margin-left:42px;margin-right:5px;color:#606266">接受发票邮箱</span>
                <el-input v-model="orderBeans.inviseTicketEmail" placeholder="" style="width:250px;" disabled></el-input>
            </el-form-item>
              <el-form-item label="收票人姓名">
                <el-input v-model="orderBeans.receivedName" placeholder="" style="width:200px;" disabled></el-input>
                <span style="margin-left:42px;margin-right:5px;color:#606266">收票人手机号</span>
                <el-input v-model="orderBeans.inviseTicketPhone" placeholder="" style="width:250px;" disabled></el-input>
                 <span style="margin-left:42px;margin-right:5px;color:#606266">收票地址</span>
                <el-input v-model="orderBeans.receivedAddress" placeholder="" style="width:250px;" disabled></el-input>
            </el-form-item>
          
            <!--<el-form-item>
                <el-button type="primary" @click="Submit">提交</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>-->
            </el-form>
          
       </div>
    </div>
</template>

<script>
// import UE from '../../common/Idtor.vue';
    export default {
        name: 'basetable',
        data() {
            return {
                tableData: [],
                orderBeans:{},
                disabled:true,
                title:'',
                form: {
                },
                id:this.$route.query.id,
                idx: -1,
                isAdd:false,
                delivery:false,
                switchValue:1,
                value5:'0',
                options:[{value:1,label:"全平台"},{value:2,label:"登录用户"},{value:3,label:"会员"}],
                pay_status:[{value:0,label:"未支付"},{value:1,label:"已支付"}],
                invoiceList:[{value:'paper',label:"纸质发票"},{value:'electron',label:"电子发票"},{value:'increment',label:"增值税发票"}],
                invoiceTypeList:[{value:'personal ',label:"个人"},{value:'company ',label:"公司"}],
                detailDatas:{},
                msg:'',
                statusList:[{value:-1,label:"全部订单"},{value:0,label:"预定中"},{value:1,label:"预定成功"},{value:2,label:"已发货"},{value:3,label:"已签收"},
                {value:4,label:"已评价"},{value:5,label:"退货售后申请"},{value:6,label:"取消"},{value:7,label:"退货中"},{value:8,label:"已退货"}
                ],
                orderGoods:[],
                orderBeans:{},

            }
        },
        created() {
        },
        mounted(){
          this.getDetail(); 
        },
        methods: {
            // 获取列表数据
            getDetail() {
                var filter = {};
                filter.orderId = this.$route.query.id;
                this.$ajax.postu(urlA+'user/order/detail', filter).then((res) => {
                    if (res.msg == "success") {
                       this.orderGoods = res.data.userOrderGoodsList;
                       this.orderBeans = res.data.userOrder;
                    } else {
                        this.$message({
                        message: res.msg,
                        type: 'error'
                        });
                    }
                });
            },
           goHistory(){
               this.$router.push({path: '/order_list'});
               console.log(123)
           },
           
            Submit(){
              
            },
   
          




            cancel(){
               this.$router.go(-1);
            },
            
          
         
        },
      

    }

</script>

<style>
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
   .avatar-uploader{
       float:left;
       margin-right:5px;
   }
   .upload .el-upload-list{float:left !important;}
   .upload .el-upload{float:left !important;}
   .upload .el-upload-list--picture .el-upload-list__item{height:35px !important;padding:10px !important;}
   .upload .el-upload-list__item:first-child{margin-top:0px !important;margin-left:20px;}
   .upload .el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name{line-height:15px !important;}
   .upload a:hover{color:#ccc !important;background:#fff !important;}
   .upload .el-upload-list__item .el-icon-close-tip{display:none !important;}
   .back{cursor:pointer;}
</style>
