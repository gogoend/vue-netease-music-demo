import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ContentWrap from '@/components/ContentWrap/index.vue'
import MainWrap from '@/components/MainWrap/index.vue'

Vue.component('ContentWrap', ContentWrap)
Vue.component('MainWrap', MainWrap)

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
