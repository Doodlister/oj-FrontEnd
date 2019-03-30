export default {
  setLoginUser (vue, user, token) {
    let jsonUser = JSON.stringify(user)
    localStorage.setItem('user', jsonUser)
    localStorage.setItem('isLogin', true)
    localStorage.setItem('token', token)
    vue.$store.commit('setUser', user)
    vue.$store.commit('setLogin')
  },
  setLogout (vue) {
    localStorage.removeItem('user')
    localStorage.setItem('isLogin', false)
    localStorage.removeItem('token')
    vue.$store.commit('setLogout')
  },
  isLogin () {
    var state = localStorage.getItem('isLogin')
    if (localStorage.getItem('isLogin') == null) {
      return 'false'
    } else {
      if (state === 'false') {
        return false
      } else {
        return true
      }
    }
  },
  getUser () {
    let jsonUser = localStorage.getItem('user')
    let user = JSON.parse(jsonUser)
    return user
  }
}
