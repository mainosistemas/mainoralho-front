import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
const Layout = ()=>import(/*webpackName:"layout" */ '../layout/Layout')
const Room = ()=>import(/*webpackName:"root" */ '../views/Room')
const Register = ()=>import(/*webpackName:"register" */ '../views/Register')
const Project = ()=>import('../views/Project')
Vue.use(VueRouter)


const Auth=(to, from, next)=>{
  let token = window.localStorage.getItem('~token');
  if(token){
    /**
     * Alguma logica de verificação de validade
     */
    next()
  } else {
    next({
      path:'/login'
    })
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    beforeEnter:Auth,
    children:[
      {
        path:'/room/:id',
        name:'room',
        component:Room
      },
      {
        path:'/project/:id',
        name:'project',
        component:Project
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})

export default router
