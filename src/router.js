import Vue from 'vue'
import Router from 'vue-router'
import Notice from './views/Notice/Notice.vue'
import Status from './views/Status.vue'
import RankList from './views/RankList.vue'
import NoticeContent from './views/Notice/NoticeContent.vue'
import ProblemContent from './views/Problem/ProblemContent.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'notice',
      component: Notice
    },
    {
      path: '/problem',
      name: 'problem',
      component: () => import('./views/Problem/Problem.vue')
    },
    {
      path: '/status',
      name: 'status',
      component: Status
    },
    {
      path: '/rankList',
      name: 'rankList',
      component: RankList
    },
    {
      path: '/notice/:id',
      name: 'noticeContent',
      component: NoticeContent
    },
    {
      path: '/problem/:id',
      name: 'problemContent',
      component: ProblemContent
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
