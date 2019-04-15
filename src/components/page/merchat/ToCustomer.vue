<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>意向经销商</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
              <!--<div class="handle-box">
              <el-input v-model="userId	" placeholder="输入用户id" class="handle-input mr10"></el-input>
              <el-input v-model="name" placeholder="输入姓名" class="handle-input mr10"></el-input>
              <el-input v-model="corporateName" placeholder="输入公司名称" class="handle-input mr10"></el-input>
              <el-date-picker type="date" placeholder="请选择日期" v-model="form.date" value-format="yyyy-MM-dd"></el-date-picker>
              <el-select v-model="check_state" placeholder="审核状态" class="handle-select mr10">
                    <el-option key="1" label="审核中" value="1"></el-option>
                    <el-option key="2" label="审核通过" value="2"></el-option>
                    <el-option key="3" label="审核未通过" value="3"></el-option>
                </el-select>
              <el-button type="primary" icon="search" @click="getData">搜索</el-button>
            </div>-->
           <div class="handle-box add">
             <el-button type="primary" icon="el-icon-edit" class="handle-del mr10" @click="openAdd">新增</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="customer_id" label="客户id" align="center"></el-table-column>
                <el-table-column prop="customer_name" label="客户名称" align="center"></el-table-column>
                <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
                <el-table-column  label="是否联系" align="center">
                   <template slot-scope="scope">
                        <span v-if="scope.row.is_check == '0'">未联系</span>  
                        <span v-else-if="scope.row.is_check == '1'">已经联系</span>
                        <span v-else>{{scope.row.is_check}}</span>
                   </template>
                </el-table-column>
                <el-table-column prop="message" label="留言" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                 <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
              
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-tickets" @click="handleEdit(scope.$index,scope.row)">查看</el-button>
                        <!--<el-button type="text" icon="el-icon-edit" @click="changePwd(scope.$index,scope.row)">修改密码</el-button>
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
          <!-- 新增 -->
         <el-dialog title="新增意向客户" :visible.sync="addVisible" width="50%">
             <el-form ref="form" :model="addForm" label-width="100px">
                    <el-form-item label="客户名"><el-input style="width:210px;" v-model="addForm.customer_name" ></el-input></el-form-item>
                    <el-form-item label="手机号"><el-input style="width:210px;" v-model="addForm.phone"></el-input></el-form-item>
                    <el-form-item label="留言"><el-input style="width:210px;" type="textarea" v-model="addForm.message" :rows="4"></el-input></el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="saveAdd">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="50%">
             <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="客户id"><el-input style="width:210px;" v-model="form.customer_id" disabled></el-input></el-form-item>
                    <el-form-item label="客户名称"><el-input style="width:210px;"  v-model="form.customer_name" disabled></el-input></el-form-item>
                    <el-form-item label="手机号"><el-input style="width:210px;" v-model="form.phone" disabled></el-input></el-form-item>
                    <el-form-item label="留言"><el-input style="width:210px;" type="textarea" v-model="form.message" disabled></el-input></el-form-item>
                    <el-form-item label="是否联系">
                      <el-select v-model="form.is_check" placeholder="请选择">
                        <el-option
                        v-for="item in checkList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="备注"><el-input style="width:210px;" type="textarea" v-model="form.remark"></el-input></el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveEdit">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
        </el-dialog>

         <!-- 修改密码 -->
        <el-dialog :title="title" :visible.sync="pwVisible" width="50%">
             <el-form ref="form"label-width="100px">
                    <el-form-item label="新密码"><el-input style="width:200px;" type="password" v-model="password"></el-input></el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="savePwd">保存</el-button>
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
                pwVisible:false,
                addVisible:false,
                isView:false,//判断是否是查看和编辑
                disabled:true,
                checkList:[{id:0,name:'未联系'},{id:1,name:'已联系'}],
                title:'',
                state:'',
                form: {
                },
                addForm:{},
                idx: -1,
                isAdd:false,
                roleList:[],
                roleValue:'',
                password:'',
                pwd_id:-1,
            }
        },
        created() {
            this.getData(1);
            this.getRole();
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
            // 获取列表数据
            getData(arr) {
                var filter = {};
                filter.page  = arr;
                filter.limit =10;
                this.$ajax.postu(url+'memberInterfaces.api?getCustomer', filter).then((res) => {
                    if (res.status == "ok") {
                       this.tableData = res.data;
                       this.total = res.total;
                    } else {
                        this.$message({
                        message: res.error,
                        type: 'error'
                        });
                    }
                });
            },
            // 获取角色列表
            getRole(){
              var filter = {};
              filter.pageNum  = this.cur_page;
              filter.pageSize =50;
              this.$ajax.postu(urlA+'role/listRolePage', filter).then((res) => {
                    if (res.msg == "success") {
                       this.roleList = res.data.list;
                    } else {
                        this.$message({
                        message: res.msg,
                        type: 'error'
                        });
                    }
                });
            },
            // x新增
            openAdd(){
             this.addVisible =true;
            },
            saveAdd(){
              this.$ajax.postu(url+'memberInterfaces.api?addCustomer', this.addForm).then((res) => {
                    if (res.status == "ok") {
                       this.$message.success('添加成功');
                       this.addVisible = false;
                       this.getData(1);
                    } else {
                        this.$message({
                        message: res.error,
                        type: 'error'
                        });
                    }
                });
            },
            // 编辑
            handleEdit(index, row) {
              this.editVisible = true;
                 this.isAdd=true;
                 const item = this.tableData[index];
                 this.form =item;
                 this.title = '编辑账号';
            },
            // 保存编辑
            saveEdit() {
                  
                    var params = {};
                    params.customer_id = this.form.customer_id;
                    params.remark = this.form.remark;
                    params.is_check = this.form.is_check;
                    this.$ajax.postu(url+'memberInterfaces.api?updateCustomer',params).then((res) => {
                        if (res.status == "ok") {
                        this.$message.success('更新成功');
                        this.editVisible = false;
                        this.getData(1);
                        } else {
                            this.$message({
                            message: res.error,
                            type: 'error'
                            });
                        }
                    });  
               
            },
            //修改密码
            changePwd(index,row){
              this.pwd_id = row.account_id;
              this.pwVisible = true;
              this.password='';
            },
            savePwd(){
              this.$ajax.postu(urlA+'account/updatePassword',{account_id:this.pwd_id,password:this.password}).then((res) => {
                    if (res.msg == "success") {
                       this.$message.success('修改成功');
                       this.pwVisible = false;
                       this.getData();
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
               this.pwVisible = false;
               this.addVisible = false;
            },
            handleDelete(index, row) {
                this.idx = row.account_id;
                this.delVisible = true;
                
            },
             // 确定删除
            deleteRow(){
                 this.$ajax.postu(urlA+'account/deleteAccountInfo',{account_id:this.idx}).then((res) => {
                    if (res.msg == "success") {
                       this.$message.success('删除成功');
                       this.delVisible = false;
                       this.getData();
                    } else {
                        this.$message({
                        message: res.msg,
                        type: 'error'
                        });
                    }
                });
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
