import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './../views/Login.vue'
import Cadastro from './../views/Cadastro.vue'
import Mapa from './../views/Mapa.vue'

import store from './../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (!store.getters['getUsuario']) {
          next()
      } else {
          next({ name: 'mapa' })
      }
    }
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro,
    beforeEnter: (to, from, next) => {
      if (!store.getters['getUsuario']) {
          next()
      } else {
          next({ name: 'mapa' })
      }
    }
  },
  {
    path: '/mapa',
    name: 'mapa',
    component: Mapa,
    beforeEnter: (to, from, next) => {
      if (store.getters['getUsuario']) {
          next()
      } else {
          next({ name: 'login' })
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
