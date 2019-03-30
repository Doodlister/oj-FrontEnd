import api from '../index'
import url from './url'

export default {
  /* 分页获取noitce */
  problemPage (params) {
    // return出去了一个promise
    return api.get(url.problem, params)
  },
  deleteProblem (params) {
    return api.delete(url.problem, params)
  },
  addProblem (params) {
    return api.post(url.problem, params)
  },
  findProblemById (id) {
    return api.get(url.problem + '/' + id)
  }
}
