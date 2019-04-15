<template>
<div>
  <ul id="leftTree" class="ztree"></ul>
  <a id="checkAllTrue" href="#" >勾选</a>
  <a id="checkAllFalse" href="#">取消勾选</a>
</div>
</template>
<script>
 export default {
    data() {
      return {
        imageUrl: ''
      };
    },
    mounted() {
        var setting = {
        check:{
            enable:true
        },
        view: {
            showLine: true,//显示节点之间的连线。
            selectedMulti: false  //允许同时选中多个节点。
        },
        data: {
            simpleData: {
                enable:true, //使用简单数据模式
                idKey: "id",//节点数据中保存唯一标识的属性名称
                pIdKey: "pId",//节点数据中保存其父节点唯一标识的属性名称
                rootPId: "" //用于修正根节点父节点数据 默认值：null
            }
        } ,
        // callback:{
        // 	onCheck:onCheck
        // }
    };
    var nodes = [
        {id :"1",pId:"0",name :"山西省"},
        {id :"2",pId:"0",name : "河北省"},
        {id :"3",pId:"0",name : "内蒙省"},
        {id :"4",pId:"0",name : "吉林省"},
        {id :"11",pId:"1",name: "大同市"},
        {id :"12",pId:"1",name: "朔州市"},
        {id :"21",pId:"2",name: "石家庄"},
        {id :"22",pId:"2",name: "唐山市"},
        {id :"31",pId:"3",name: "赤峰市"},
        {id :"32",pId:"3",name: "呼市"},
        {id :"41",pId:"4",name: "长春市"},
        {id :"42",pId:"4",name: "四平市"},
        {id :"43",pId:"4",name: "辽源市"},
       
    ];
    var tree  = $.fn.zTree.init($('#leftTree'), setting, nodes);
    tree.expandAll(tree);
        },
    methods: {
   
    
    }
  }
</script>
<style scoped>
 
</style>