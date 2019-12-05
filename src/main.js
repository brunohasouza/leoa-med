import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import undefined from 'firebase/firestore'


firebase.initializeApp({
  apiKey: "AIzaSyBZpx6WJFGBe_2QjHN72WV0LUQYz43_jBs",
  authDomain: "leoamed-890b4.firebaseapp.com",
  databaseURL: "https://leoamed-890b4.firebaseio.com",
  projectId: "leoamed-890b4",
  storageBucket: "leoamed-890b4.appspot.com",
  messagingSenderId: "553187491112",
  appId: "1:553187491112:web:3ff9bc0fcf1c673a17e41d"
})

export  const db = firebase.firestore()
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
