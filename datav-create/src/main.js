import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueDragResize from 'vue-drag-resize'
Vue.component('VueDragResize', VueDragResize)

import MyEcharts from '@/components/MyEcharts'
Vue.component('MyEcharts', MyEcharts)

import MyScaleScreen from "@/components/MyScaleScreen";
Vue.component('MyScaleScreen', MyScaleScreen)

import MyColorPicker from '@/components/MyColorPicker'
Vue.component('MyColorPicker', MyColorPicker)

import "@/components/c" //components


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
