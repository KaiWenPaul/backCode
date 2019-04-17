<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>活动发布</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-input v-model="userId	" placeholder="输入用户id" class="handle-input mr10"   @keyup.enter.native="getData(1)"></el-input>
              <el-input v-model="name" placeholder="输入姓名" class="handle-input mr10"   @keyup.enter.native="getData(1)"></el-input>
              <el-input v-model="corporateName" placeholder="输入公司名称" class="handle-input mr10"   @keyup.enter.native="getData(1)"></el-input>
               <!--<el-date-picker type="date" placeholder="请选择日期" v-model="form.date" value-format="yyyy-MM-dd"></el-date-picker>-->
              <el-select v-model="check_state" placeholder="审核状态" class="handle-select mr10"   @keyup.enter.native="getData(1)">
                    <el-option key="1" label="审核中" value="1"></el-option>
                    <el-option key="2" label="审核通过" value="2"></el-option>
                    <el-option key="3" label="审核未通过" value="3"></el-option>
                </el-select>
              <el-button type="primary" icon="search" @click="getData(1)">搜索</el-button>
            </div>
           <div class="handle-box add">
               <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
             <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleEdit">新增</el-button>-->
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="distributorId" label="分销商id" align="center"></el-table-column>
                <el-table-column prop="userId" label="用户id" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名字" align="center"></el-table-column>
                <el-table-column prop="recommend_code" label="推荐码" align="center"></el-table-column>
                <el-table-column label="性别" align="center">
                   <template slot-scope="scope">
                    <span v-if="scope.row.sex == '1'">男</span>  
                    <span v-else-if="scope.row.sex == '2'">女</span>
                    <span v-else>保密</span>
                  </template>
                </el-table-column>
                <el-table-column prop="corporateName" label="公司名称" align="center"></el-table-column>
                <el-table-column prop="companyAddress" label="公司地址" align="center"></el-table-column>
                <el-table-column label="审核状态" align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.audit == '1'">审核中</span> 
                    <span v-else-if="scope.row.audit == '2'">审核通过</span>
                    <span v-else-if="scope.row.audit == '3'">审核未通过</span>
                    <span v-else>其它</span>  
                  </template>
                </el-table-column>
                <el-table-column prop="timeCreated" label="提交时间" align="center"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-tickets" @click="handleEdit(scope.$index,scope.row)">查看</el-button>
                       
                         <!--<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
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
        <!-- 编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="50%">
             <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="分销商id"><el-input style="width:200px;" v-model="form.distributorId" :disabled="true"></el-input></el-form-item>
                    <el-form-item label="用户id"><el-input style="width:200px;" v-model="form.userId" :disabled="true"></el-input></el-form-item>
                    <el-form-item label="名字"><el-input style="width:200px;" v-model="form.name" :disabled="disabled"></el-input></el-form-item>
                    <el-form-item label="推荐码"><el-input style="width:200px;" v-model="form.recommend_code"></el-input></el-form-item>
                    <el-form-item label="性别">
                        <el-radio :disabled="disabled" v-model="sex" label="1">男</el-radio>
                        <el-radio :disabled="disabled" v-model="sex" label="2">女</el-radio>
                        <el-radio :disabled="disabled" v-model="sex" label="0">保密</el-radio>
                    </el-form-item>
                    <el-form-item label="审核状态">
                        <el-select v-model="state" placeholder="选择状态" :disabled="false" class="handle-select mr10">
                            <el-option key="1" label="审核中" value="1"></el-option>
                            <el-option key="2" label="审核通过" value="2"></el-option>
                            <el-option key="3" label="审核未通过" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审核意见"><el-input style="width:500px;" v-model="form.auditCount" :disabled="false"></el-input></el-form-item>
                    <el-form-item label="公司名称"><el-input style="width:200px;" v-model="form.corporateName" :disabled="disabled"></el-input></el-form-item>
                    <el-form-item label="公司地址"><el-input style="width:500px;" v-model="form.companyAddress" :disabled="disabled"></el-input></el-form-item>
                    <el-form-item label="营业执照">
                        <img  :src="imgUrl+form.businessLicense1" alt="" style="width: 80px;height: 80px;" @click="bigImgShow(form.businessLicense1)">
                        <img  :src="imgUrl+form.businessLicense2" alt="" style="width: 80px;height: 80px"  @click="bigImgShow(form.businessLicense2)">
                        <img  :src="imgUrl+form.businessLicense3" alt="" style="width: 80px;height: 80px"  @click="bigImgShow(form.businessLicense3)">
                        <div class="img-show-mask" id="img-show-mask" v-show="maskBtn" @click="closeBigImg"><img :src="bigImgSrc" class="bigImg" id="bigImg" /></div>

                    
                    
                    </el-form-item>

                    <el-form-item v-if="isAdd===false" label="提交时间"><el-input style="width:200px;" v-model="form.timeCreated" :disabled="true"></el-input></el-form-item>
                  
                    <el-form-item>
                        <el-button type="primary" @click="saveEdit">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
              <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>-->
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
                isView:false,//判断是否是查看和编辑
                moveImage1:'',//企业执照
                moveImage2:'',//企业执照
                moveImage3:'',//企业执照
                name:'',
                userId:'',
                corporateName:'',
                shopId:'',
                disabled:true,
                title:'',
                sex:'1',
                state:'',
                form: {
                },
                idx: -1,
                isAdd:false,
                maskBtn:false,
                bigImgSrc:'',
                imgUrl:imgUrlA+'vlb-yzb/'
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
                if(this.name!=''){ filter.name = this.name;}
                if(this.corporateName!=''){  filter.corporateName = this.corporateName;}
                if(this.userId!=''){  filter.userId = this.userId;}
                if(this.check_state!=''){filter.audit = this.check_state;}
                this.$ajax.postu(urlA+'yzb/distributor/listShopPage', filter).then((res) => {
                    if (res.msg == "success") {
                       this.tableData = res.data.list;
                       this.total = res.data.total;
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
                this.state = item.audit===1?'审核中':item.audit===2?'审核通过':'审核未通过';
            },
            // 保存编辑
            saveEdit() {
               
                    this.form.sex=this.sex;
                    if(this.state==='1'){
                        this.form.audit = 1;
                    }else if(this.state==='2'){
                        this.form.audit = 2;
                    }else if(this.state==='3'){
                        this.form.audit = 3;
                    }

                   this.$ajax.postu(urlA+'yzb/distributor/update',{distributorId:this.form.distributorId,audit:this.form.audit,auditCount:this.form.auditCount,recommend_code:this.form.recommend_code}).then((res) => {
                    if (res.msg == "success") {
                       this.$message.success('修改成功');
                       this.editVisible = false;
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
            },
            handleDelete(index, row) {
                this.idx = row.id;
                this.delVisible = true;
            },
             // 确定删除
            deleteRow(){
                 this.$ajax.postu(url+'distributor/tstdistributoraddactivity/delete',{id:this.idx}).then((res) => {
                    if (res.description == "success") {
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
            bigImgShow: function(url) { //打开图片预览
				this.bigImgSrc = this.imgUrl+url;
				this.maskBtn = true;
				this.$nextTick(function() {
					var imgShowMask = document.getElementById('img-show-mask');
					var img = document.getElementById('bigImg');
					var w = document.documentElement.clientWidth || document.body.clientWidth;
					var h = document.documentElement.clientHeight || document.body.clientHeight;
					var offsetY=window.pageYOffset;
					var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
						imgShowMask.style.height=scrollHeight+'px';
						img.style.left=(w/2-250)+'px';
						img.style.top=(h/2-250+offsetY)+'px';
				});
 
			},
			closeBigImg: function() { //关闭图片预览
				this.maskBtn = false;
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
   .img-show-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3000;
    background: rgba(0, 0, 0, .5);
}
 
.img-show-mask .bigImg {
    width: 500px;
    height: 500px;
    position: absolute;
    z-index: 3100;
    top: 0;
    left: 0;
    margin: auto;
}
</style>
