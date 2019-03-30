import api from '../index'
import url from './url'

export default {

  checkUsername (params) {
    // return出去了一个promise
    return api.get(url.user, params)
  },
  register (params) {
    return api.post(url.user, params)
  },
  findProfile (params) {
    let hader = {
      authorization: params.token
    }

    return api.get(url.user + '/profile', {}, hader)
  }

}
