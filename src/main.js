import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import routes from './routes'

window.jQuery = window.$ = require('jquery/dist/jquery')
require('bootstrap')

Vue.use(VueRouter)
Vue.use(VueResource)

var VueApp = Vue.extend(App)
var router = new VueRouter()

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

router.map(routes)

router.start(VueApp, '#app')

router.beforeEach(function (transition) {
  if (transition.to.auth) {
    if (window.localStorage.getItem('jwt-token')) {
      transition.next()
    } else {
      transition.redirect('/login')
    }
  } else {
    transition.next()
  }
})
