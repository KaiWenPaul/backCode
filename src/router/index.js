import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                //活动管理
                {
                    path: '/activity',
                    component: resolve => require(['../components/page/activity/Activity.vue'], resolve),
                    meta: { title: '活动发布' }
                },
                {
                    path: '/add_activity',
                    component: resolve => require(['../components/page/activity/AddActivity.vue'], resolve),
                    meta: { title: '新增活动' }
                },
                {
                    path: '/add_activity_add',
                    component: resolve => require(['../components/page/activity/CreateActivity.vue'], resolve),
                    meta: { title: '创建活动' }
                },
                {
                    path: '/export_goods',
                    component: resolve => require(['../components/page/activity/ExportGoods.vue'], resolve),
                    meta: { title: '导入产品' }
                },
                {
                    path: '/type_list',
                    component: resolve => require(['../components/page/activity/TypeList.vue'], resolve),
                    meta: { title: '活动类型' }
                },
                // 商家管理
                {
                    path: '/merchat',
                    component: resolve => require(['../components/page/merchat/MerchatList.vue'], resolve),
                    meta: { title: '商家列表' }
                },
                {
                    path: '/distributor',
                    component: resolve => require(['../components/page/merchat/DistributorList.vue'], resolve),
                    meta: { title: '分销商列表' }
                },
                {
                    path: '/client',
                    component: resolve => require(['../components/page/merchat/ClientList.vue'], resolve),
                    meta: { title: '客户管理' }
                },
                {
                    path: '/customer',
                    component: resolve => require(['../components/page/merchat/Customer.vue'], resolve),
                    meta: { title: '客户列表' }
                },
                {
                    path: '/to_customer',
                    component: resolve => require(['../components/page/merchat/ToCustomer.vue'], resolve),
                    meta: { title: '意向经销商' }
                },
                // 系统管理
                {
                    path: '/account',
                    component: resolve => require(['../components/page/system/Account.vue'], resolve),
                    meta: { title: '账号管理' }
                },
                {
                    path: '/role',
                    component: resolve => require(['../components/page/system/Role.vue'], resolve),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/model',
                    component: resolve => require(['../components/page/system/Model.vue'], resolve),
                    meta: { title: '模块管理' }
                },
                // 营销管理
                {
                    path: '/coupons',
                    component: resolve => require(['../components/page/marketing/coupons.vue'], resolve),
                    meta: { title: '优惠券管理' }
                },
                {
                    path: '/coupon_goods',
                    component: resolve => require(['../components/page/marketing/couponGoods.vue'], resolve),
                    meta: { title: '优惠券产品' }
                },

                // 订单管理
                {
                    path: '/order_list',
                    component: resolve => require(['../components/page/order/OrderList.vue'], resolve),
                    meta: { title: '订单列表' }
                },
                {
                    path: '/order_detail',
                    component: resolve => require(['../components/page/order/OrderDetail.vue'], resolve),
                    meta: { title: '订单详情' }
                },
                {
                    path: '/test',
                    component: resolve => require(['../components/page/test.vue'], resolve),
                    meta: { title: '测试专用' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
 
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '统计' }
                },
                {
                    path: '/brand_statistic',
                    component: resolve => require(['../components/page/statistic/BrandStatistic.vue'], resolve),
                    meta: { title: '活动统计' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: resolve => require(['../components/page/DragList.vue'], resolve),
                //     meta: { title: '拖拽列表' }
                // },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
