import Vue from 'vue'
import Router from 'vue-router'
import SignUp from './views/SignUp.vue'

Vue.use(Router)

export default new Router({
  mode : "history",
  routes: [
    {
      path: '/',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path : '/profile',
      name : 'profile',
      component : () => import(/* webpackChunkName: "about" */ './views/Profile.vue')
    }
  ]
})
