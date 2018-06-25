// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue';
// import { Button } from 'bootstrap-vue/es/components';
import bButton from 'bootstrap-vue/es/components/button/button';

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
const http=Vue.http
export default http
Vue.use(BootstrapVue);
Vue.component('b-button', bButton);

const SERVER_URL = "http://localhost:8085";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false;
Vue.prototype.SERVER_URL = SERVER_URL;
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if(to.name == 'Login' || to.name == 'SignUp') { 
      if(localStorage.token) {
          router.push("profile")
      } else {
          next()
      }
      // next()
  } else if (localStorage.token) {
    console.log("Router Name", to.name);
    next()
  } else { 
    router.push("")
  }
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  SERVER_URL : SERVER_URL
})
