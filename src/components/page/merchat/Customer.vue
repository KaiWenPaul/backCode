<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>客户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
             <el-select v-model="userNature" placeholder="请选择客户性质">
                <el-option
                    v-for="item in natureList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
               <el-select v-model="userGrade" placeholder="请选择客户等级">
                <el-option
                    v-for="item in gradeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
               <el-select v-model="userType" placeholder="请选择客户类型">
                <el-option
                    v-for="item in typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <!--<el-input v-model="phone" placeholder="输入手机号" class="handle-input mr10"   @keyup.enter.native="getData(1)"></el-input>
              <el-date-picker type="date"  placeholder="开始时间" v-model="start_time" value-format="yyyy-MM-dd"></el-date-picker>
              <el-date-picker type="date"  placeholder="结束时间" v-model="end_time" value-format="yyyy-MM-dd"></el-date-picker>-->
              <el-button type="primary" icon="search" @click="getData(1)">搜索</el-button>
            </div>
           <div class="handle-box add">
               <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
             <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleEdit">新增</el-button>-->
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="id" label="ID" align="center"></el-table-column>
                <el-table-column prop="shopId" label="店铺ID" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="手机号" align="center"></el-table-column>

                <el-table-column  label="性别" align="center">
                   <template slot-scope="scope">
                    <span v-if="scope.row.userSex == '0'">男</span>  
                    <span v-else>女</span>
                  </template>
                </el-table-column>
                <el-table-column prop="userProject" label="意向项目" align="center"></el-table-column>
                <el-table-column label="客户性质" align="center">
                   <template slot-scope="scope">
                    <span v-if="scope.row.userNature == '0'">个人用户</span>  
                    <span v-else-if="scope.row.userNature == '1'">单位用户</span>
                    <span v-else-if="scope.row.userNature == '2'">团购用户</span>
                    <span v-else>其它</span>
                  </template>
                </el-table-column>
                 <el-table-column label="客户等级" align="center">
                   <template slot-scope="scope">
                    <span v-if="scope.row.userGrade == 'A'">A级</span>  
                    <span v-else-if="scope.row.userGrade == 'B'">B级</span>
                    <span v-else-if="scope.row.userGrade == 'C'">C级</span>
                    <span v-else-if="scope.row.userGrade == 'D'">D级</span>
                    <span v-else>其它</span>
                  </template>
                </el-table-column>
                 <el-table-column label="客户类型" align="center">
                   <template slot-scope="scope">
                    <span v-if="scope.row.userType == '0'">意向</span>  
                    <span v-else-if="scope.row.userType == '1'">认购</span>
                    <span v-else-if="scope.row.userType == '2'">签约</span>
                     <span v-else-if="scope.row.userType == '2'">新增</span>
                    <span v-else>其它</span>
                  </template>
                </el-table-column>
                <el-table-column prop="cognitiveApproach" label="认知途径" align="center"></el-table-column>
                <el-table-column prop="idCardName" label="证件名称" align="center"></el-table-column>
                <el-table-column prop="idCardNumber" label="证件号码" align="center"></el-table-column>
                <el-table-column prop="careerCounselor" label="职业顾问" align="center"></el-table-column>
                <el-table-column prop="registerData" label="登记日期" align="center"></el-table-column>
                <el-table-column prop="trackingInformation" label="跟踪信息" align="center"></el-table-column>
             
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                 <!--<el-table-column label="操作" width="200" align="left">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-tickets" @click="handleEdit(scope.$index,scope.row)">查看</el-button>
                        <el-button v-if="scope.row.identity == '3'" type="text" icon="el-icon-edit" @click="openChangeRole(scope.row)">更改为C用户</el-button>
                        <el-button  v-if="scope.row.identity == '1'" type="text" icon="el-icon-refresh" @click="openBind(scope.$index, scope.row)">绑定店铺</el-button>
                    </template>
                </el-table-column>-->
            </el-table>
            <!--<div class="pagination">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-size="10"
                layout="total,prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>-->
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="50%">
             <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="用户id"><el-input style="width:200px;" v-model="form.id" :disabled="true"></el-input></el-form-item>
                    <el-form-item label="昵称"><el-input style="width:200px;" v-model="form.account_name"></el-input></el-form-item>
                    <el-form-item label="手机号"><el-input style="width:200px;" v-model="form.phone"></el-input></el-form-item>
                    <el-form-item label="性别">
                        <el-radio  v-model="sex" label="1">男</el-radio>
                        <el-radio  v-model="sex" label="2">女</el-radio>
                        <el-radio  v-model="sex" label="0">保密</el-radio>
                    </el-form-item>
                    <el-form-item  label="出生日期"><el-date-picker type="date"  placeholder="" v-model="form.birthday" value-format="yyyy-MM-dd"></el-date-picker></el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveEdit">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
        </el-dialog>
        <!-- 绑定店铺提示框 -->
        <el-dialog :title="title" :visible.sync="bindVisible" width="50%">
             <el-form ref="form" :model="bindForm" label-width="100px">
                    <el-form-item label="店铺id"><el-input style="width:200px;" v-model="shop_id" ></el-input></el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="bindShop">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
          <!-- 更改用户角色提示框 -->
         <el-dialog title="提示" :visible.sync="changeVisible" width="300px" center>
            <div class="del-dialog-cnt">确定更改？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeRole">确 定</el-button>
            </span>
        </el-dialog>
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
                multipleSelection: [],
                check_state: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                listVisible:false,
                changeVisible:false,
                bindVisible:false,
                isView:false,//判断是否是查看和编辑
                moveImage1:'',//企业执照
                moveImage2:'',//企业执照
                moveImage3:'',//企业执照
                identityList:[{value:1,label:'普通用户'},{value:2,label:'未认证经销商'},{value:3,label:'经销商'}],
                natureList:[{value:0,label:'个人用户'},{value:1,label:'单位客户'},{value:2,label:'团购客户'}],
                gradeList:[{value:'A',label:'A级'},{value:'B',label:'B级'},{value:'C',label:'C级'},{value:'D',label:'D级'}],
                typeList:[{value:0,label:'意向'},{value:1,label:'认购'},{value:2,label:'签约'},{value:3,label:'新增'}],
                disabled:true,
                title:'',
                sex:'1',
                state:'',
                form: {
                },
                idx: -1,
                isAdd:false,
                //搜索条件
                id:'',
                phone:'',
                start_time:'',
                end_time:'',
                userId:'',
                bindForm:{},
                shop_id:'',
                userNature:'',
                userGrade:'',
                userType:''

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
                this.getData( this.cur_page);
            },

            // 获取 easy-mock 的模拟数据
            getData(arr) {
                var filter = {};
                filter.pageNum  = arr;
                filter.pageSize =10;
                if(this.userNature!=''){ filter.userNature = this.userNature;}
                if(this.userGrade!=''){filter.userGrade = this.userGrade;}
                if(this.userType!=''){ filter.userType = this.userType;}
                filter.shopId = localStorage.getItem('shopId')
                // filter.shopId = 1
                this.$ajax.postu(urlA+'/user/shop/selectusershop', filter).then((res) => {
                    if (res.msg == "success") {
                       this.tableData = res.data;
                    //    this.total = res.data.total;
                    } else {
                        this.$message({
                        message: res.msg,
                        type: 'error'
                        });
                    }
                });
            },
            // 编辑
            handleEdit(index, row) {
                this.editVisible = true;
                const item = this.tableData[index];
                this.form =item;
                this.sex = item.sex.toString();
            },
            // 保存编辑
            saveEdit() {
                   console.log(this.form)
                   var params = {};
                   params.id=this.form.id;
                   params.account_name = this.form.account_name;
                   params.phone = this.form.phone;
                   params.sex=this.sex;
                   params.birthday=this.form.birthday;
                   params.identity=this.form.identity;

                   this.$ajax.postu(urlA+'weixinAuth/updateUserInfo',params).then((res) => {
                    if (res.msg == "success") {
                       this.$message.success('修改成功');
                       this.editVisible = false;
                       this.getData(1);
                    } else {
                        this.$message({
                        message: res.msg,
                        type: 'error'
                        });
                    }
                  });
               
            },
            cancel(){
               this.editVisible = false;
               this.changeVisible = false;
               this.bindVisible = false;
                this.getData(1);
            },
            handleDelete(index, row) {
                this.idx = row.id;
                this.delVisible = true;
            },
            openChangeRole(row){
              this.userId = row.id;
              this.changeVisible = true;
            },
            openBind(index,row){
              this.shop_id = row.shop_id;
              this.userId = row.id;
              this.bindVisible =true;
            },
           bindShop(){
                 var params ={};
                 params.userId = this.userId;
                 params.shopId  =this.shop_id;
                 this.$ajax.postu(urlA+'/user/shop/changeUserShopId',params).then((res) => {
                    if (res.code == "200") {
                       this.$message.success('绑定成功');
                       this.bindVisible = false;
                       this.getData(1);
                    } else {
                        this.$message({
                        message: res.msg,
                        type: 'error'
                        });
                    }
                });
            },
            // 更改为c用户
            changeRole(){
              this.$ajax.postu(urlA+'weixinAuth/deleteUserInfoIdentity',{userId:this.userId}).then((res) => {
                    if (res.code == "200") {
                       this.$message.success('更改成功');
                       this.changeVisible = false;
                       this.getData(1);
                    } else {
                        this.$message({
                        message: res.msg,
                        type: 'error'
                        });
                    }
                });
            },
             // 确定删除
            deleteRow(){
                 this.$ajax.postu(url+'distributor/tstdistributoraddactivity/delete',{id:this.idx}).then((res) => {
                    if (res.description == "success") {
                       this.$message.success('删除成功');
                       this.delVisible = false;
                       this.getData(1);
                    } else {
                        this.$message({
                        message: res.msg,
                        type: 'error'
                        });
                    }
                });
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
   .avatar-uploader{
       float:left;
       margin-right:5px;
   }
</style>
