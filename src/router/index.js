import router from './routers'
// import store from '@/vuex'

import {
  getToken
} from '@/utils/auth' // getToken from cookie
import {
  buildMenus
} from '@/api/system/menu'



const whiteList = ['/login','/tree'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  if (to.title) {
    document.title = to.title
  }

  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({
        path: '/'
      })

    } else {
      next()
    //   if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
    //     store.dispatch('GetInfo').then(res => { // 拉取user_info
    //       // 动态路由，拉取菜单
    //     }).catch((err) => {
    //       store.dispatch('LogOut').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //     // 登录时未拉取 菜单，在此处拉取
    //   } else if (store.getters.loadMenus) {
    //     // 修改成false，防止死循环
    //     store.dispatch('updateLoadMenus').then(res => {})
    //     loadMenus(next, to)
    //   } else {
    //     next()
    //   }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
       next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
  
    }
  }
})

export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象

    return routers.filter(router => {
      if (router.component) {
        if (router.component === 'Layout') { // Layout组件特殊处理
           //router.component = Layout
        } else {
          const component = router.component
          console.log(router.component);
          router.component = loadView(component)
        }
      }
      if (router.children && router.children.length) {
        router.children = filterAsyncRouter(router.children)
      }
      return true
    })
  }

export const loadMenus = (next, to) => {
  buildMenus().then(res => {

    let menus = JSON.parse(JSON.stringify(res.list));
    menus = menus.map(function (item) {
      return {
        id: item.id,
        pId: item.pId,
        path: item.path,
        component: item.component,
        meta: {
          title: item.title,
          breadcrumb: item.breadcrumb,
          activeMenu: item.activeMenu,
          icon: item.icon,
          affix: item.affix,
          noCache: item.noCache,

        },
        children: item.children
      };
    })
    let menutree = filterArray(menus, "id", "pId", "children")
    menutree = menutree.map(function (item) {
      return {
        path: item.path,
        component: item.component,
        meta: item.meta,
        children: item.children
      };
    })
    const asyncRouter = filterAsyncRouter(menutree)

    // asyncRouter.push({
    //   path: '*',
    //   redirect: '/404',
    //   hidden: true
    // })
    // store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由

    //   router.addRoutes(asyncRouter)
    //   next({
    //     ...to,
    //     replace: true
    //   })

    // })
  })
}
export const filterArray = (arr, idText, pIdText, childText) => {
  let map = {};
  arr.forEach((v) => {
    map[v[idText]] = v;
  });
  let treeData = [];
  arr.forEach((child) => {
    const mapItem = map[child[pIdText]];
    if (mapItem) {
      (mapItem[childText] || (mapItem[childText] = [])).push(child);
    } else {
      treeData.push(child);
    }
  });
  return treeData;
}


router.afterEach(() => {

})