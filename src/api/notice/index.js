import api from '../index'
import url from './url'

export default {
  /* 分页获取noitce */
  noticePage (params) {
    // return出去了一个promise
    return api.get(url.notice, params)
  },
  deleteNoticeById (id) {
    return api.delete(url.notice + '/' + id)
  },
  findNoticeById (id) {
    return api.get(url.notice + '/' + id)
  }
}
