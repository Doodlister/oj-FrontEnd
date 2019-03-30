import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import 'babel-polyfill'
import api from './api/install'
import utils from './common/utils'
import { Message } from 'iview'

Vue.config.productionTip = false
Vue.use(api)

Message.config({
  top: 100
})
new Vue({
  router,
  store,
  creater () {
    // console.log('createc创建了')
    store.state.isLogin = utils.isLogin
  },
  render: h => h(App)
}).$mount('#app')
