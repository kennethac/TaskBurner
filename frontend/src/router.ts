import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Class from './views/Class.vue'
import About from './views/About.vue'
import CreateClass from './views/CreateClass.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/class/create',
      name: 'createClass',
      component: CreateClass
    },
    {
      path: '/class/:classKey',
      name: 'class',
      component: Class,
      props: true
    },
    {
      path: '/combined',
      name: 'combined',
      component: Class,
      props: { classKey: "all" }
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
