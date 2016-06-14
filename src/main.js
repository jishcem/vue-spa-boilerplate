import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import configRouter from './routes'

window.jQuery = window.$ = require('jquery/dist/jquery')
require('bootstrap')
require('../node_modules/nprogress/nprogress.css')

Vue.use(VueRouter)
Vue.use(VueResource)

var VueApp = Vue.extend(App)
const router = new VueRouter({
  history: true,
  saveScrollPosition: true
})

// Set Auth Headers for every requests
Vue.http.interceptors.push({
  request (request) {
    request.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('jwt-token')
    return request
  },
  response (response) {
    return response
  }
})

configRouter(router)

router.start(VueApp, '#app')
