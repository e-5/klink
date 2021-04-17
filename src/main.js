import Vue from 'vue'
import App from './App.vue'
import request from './request'
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './base.css'
Vue.use(Loading)
Vue.config.productionTip = false
Vue.prototype.$req = request
new Vue({
  render: h => h(App),
}).$mount('#app')
