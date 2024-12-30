import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

Vue.config.productionTip = false

import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import MyEcharts from '@/components/MyEcharts'
Vue.component('MyEcharts', MyEcharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
