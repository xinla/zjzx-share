import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // redirect:"/detail",
      component: home
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('./views/detail.vue')
    },
    {
      path: '/wendaDetail',
      name: 'wendaDetail',
      component: () => import( './views/wendaDetail.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: () => import('./views/agreement.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('./views/privacy.vue')
    }
  ]
})
