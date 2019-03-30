import Vue from 'vue'
import Vuex from 'vuex'
import utils from './common/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: utils.isLogin(),
    user: utils.getUser()
  },
  getters: {
    getIsLogin: function (state) {
      if (state.isLogin === true) {
        return true
      } else {
        return false
      }
    },
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    setLogin (state) {
      // 变更状态
      state.isLogin = true
    },
    setLogout (state) {
      state.isLogin = false
    },
    setUser (state, u) {
      state.user = u
    }
  },
  actions: {

  }
})
