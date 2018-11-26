// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/lazy'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import axios from 'axios'
import '@/mock'
import store from './store'
import PouchDB from 'pouchdb'
import "./Filter.js";
//引用Croppa图片裁剪
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
import clipper from '../static/clipper'
import HTTP from "./api/config.js";
 import moment from 'moment';
 import 'moment/locale/zh-cn';
 moment.locale('zh-cn');

Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.baseURL = HTTP.baseURL; // 测试
axios.defaults.headers.post["Content-Type"] =
  "multipart/form-data;charset=UTF-8";

Vue.use(Viser)
Vue.use(Antd)
Vue.use(Croppa)
Vue.use(clipper)

router.afterEach((to, from, next) => {
  // 控制路由页面跳转滚动条在顶部
  window.scrollTo(0, 0);
});
router.beforeEach((to, from, next) => {
  console.log(111111)
  if (to.meta.requireAuth){ // 判断该路由是否需要登录权限
    console.log(22222)
    console.log('需要登录');
    console.log(sessionStorage.getItem("user"))
    let us=sessionStorage.getItem("user")
    let er=JSON.parse(us);
    console.log(er);
    store.state.account.user=JSON.parse(sessionStorage.getItem("user"));
    console.log(store.state.account.user.message)
    if (store.state.account.user.message==='登录成功') { // 判断当前的token是否存在 ； 登录存入的token
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    var db = new PouchDB('admindb')
    var db1=new PouchDB('admindb1')
    db.get('currUser').then(doc => {
      this.$store.commit('account/setuser', doc.user)
    })
    db1.get('curruserId').then(doc => {
      this.$store.commit('account/setuserId', doc.userId)
    })
  },
})
