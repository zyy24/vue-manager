import Login from './views/Login.vue'
// import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import accountMat from './views/supplierManage/accountMat.vue'
import levelMat from './views/supplierManage/levelMat.vue'
import categoryMat from './views/supplierManage/categoryMat.vue'

import partnerManage from './views/partnerManage/partnerManage.vue'
import applyManage from './views/partnerManage/applyManage.vue'

import recharge from './views/rechargeManage/recharge.vue'
import rechargeSearch from './views/rechargeManage/rechargeSearch.vue'
import noRecharge from './views/rechargeManage/noRecharge.vue'

import systemUserManage from './views/systemManage/systemUserManage.vue'
import roleManage from './views/rolePermission/roleManage.vue'
import userRole from './views/rolePermission/userRole.vue'
import permissionManage from './views/rolePermission/permissionManage.vue'
import roleAuthority from './views/rolePermission/roleAuthority.vue'
import cityManage from './views/systemManage/cityManage.vue'
import retPsd from './views/systemManage/resetPsd.vue'
// import Page4 from './views/rolePermission/Page4.vue'
import version from './views/versionControl/version.vue'
 // import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/',
        component: Login,
        name: '',
        hidden: true
    },
    // {
    //     path: '/404',
    //     component: NotFound,
    //     name: '',
    //     hidden: true
    // },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '渠道商管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/accountMat', component: accountMat, name: '账户维护' },
            { path: '/levelMat', component: levelMat, name: '账户级别维护' },
            { path: '/categoryMat', component: categoryMat, name: '分类维护' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '合作商管理',
        iconCls: 'fa fa-handshake-o',
        children: [
            { path: '/partnerManage', component: partnerManage, name: '合作商管理' },
            { path: '/applyManage', component: applyManage, name: '申请管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '充值管理',
        iconCls: 'fa fa-battery-2 ',
        children: [
            { path: '/rechargeSearch', component: rechargeSearch, name: '充值查询' },
            { path: '/recharge', component: recharge, name: '充值' },
            { path: '/noRecharge', component: noRecharge, name: '未充值账户' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '角色权限管理',
        iconCls: 'fa fa-tree',
        children: [
            // { path: '/page4', component: Page4, name: '页面4' },
            { path: '/userRole', component: userRole, name: '用户角色' },
            { path: '/roleManage', component: roleManage, name: '角色管理' },
            { path: '/permissionManage', component: permissionManage, name: '权限管理' },
            { path: '/roleAuthority', component: roleAuthority, name: '角色权限' }

        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-gear',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页',},
            { path: '/systemUserManage', component: systemUserManage, name: '系统用户管理' },
            { path: '/cityManage', component: cityManage, name: '省市区管理' },
            { path: '/retPsd', component: retPsd, name: '重置密码' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-bookmark',
        leaf: true,//只有一个节点
        children: [
            { path: '/version', component: version, name: '版本控制' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;