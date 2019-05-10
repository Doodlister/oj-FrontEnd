import api from '../index'
import url from './url'

export default {

  submission (params, problemId) {
    // return出去了一个promise
    return api.post(url.submission + '?problemId=' + problemId, params)
  },
  getResult (submissionId) {
    return api.get(url.submission + '/' + submissionId)
  },
  submissionPage (params) {
    // return出去了一个promise
    return api.get(url.submission, params)
  }
}
