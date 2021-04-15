import Vue from 'vue'
import App from './App.vue'
import request from './request'
Vue.config.productionTip = false
Vue.prototype.$req = request
new Vue({
  render: h => h(App),
}).$mount('#app')
