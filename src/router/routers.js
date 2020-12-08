import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/tree',
    meta: {
        title: '树',
        noCache: true
    },
    component: (resolve) => require(['@/views/tree'], resolve),
    hidden: true
},
//   {
//     path: '/login',
//     meta: {
//         title: '登录',
//         noCache: true
//     },
//     component: (resolve) => require(['@/views/login'], resolve),
//     hidden: true
// },
// {
//     path: '/redirect',
//     component: Layout,
//     hidden: true,
//     children: [
//       {
//         path: '/redirect/:path*',
//         component: (resolve) => require(['@/views/features/redirect'], resolve)
//       }
//     ]
//   },
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard',
//     children: [
//       {
//         path: 'dashboard',
//         component: (resolve) => require(['@/views/home'], resolve),
//         name: 'Dashboard',
//         meta: { title: '首页', icon: 'index', affix: true, noCache: true }
//       }
//     ]
//   },
]
export default new Router({
    mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})