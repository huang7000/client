import Vue from 'vue'
import App from './App.vue'
import Cookies from 'js-cookie'
import router from './router/routers'
//import store from './store'

// 引入ElementUI组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//import './router/index' // permission control

// 注册ElementUI库
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})




Vue.config.productionTip = false

new Vue({
  router:router,
  //store:store,
  render: h => h(App),
}).$mount('#app')
