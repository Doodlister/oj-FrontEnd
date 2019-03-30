import api from '../index'
import url from './url'

export default {

  login (params) {
    // return出去了一个promise
    return api.post(url.session, params)
  }
}
