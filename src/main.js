import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import toast from "components/common/toast"

import fastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false

// 安装toast插件
Vue.use(toast)

Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/lanjiazai.jpeg')
})

fastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
