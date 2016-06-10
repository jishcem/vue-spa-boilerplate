import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

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

import Home from 'components/Home'
import About from 'components/About'
import Contact from 'components/Contact'
import Login from 'components/Login'
import Logout from 'components/Logout'
import _404 from 'components/404'
import Tasks from 'components/Tasks'

router.map({
  '/': {
    component: Home,
    auth: false
  },
  '/home': {
    component: Home,
    auth: false
  },
  '/about': {
    component: About,
    auth: false
  },
  '/contact': {
    component: Contact,
    auth: false
  },
  '/login': {
    component: Login,
    auth: false
  },
  '/logout': {
    component: Logout,
    auth: false
  },
  '/tasks': {
    component: Tasks,
    auth: true
  },
  '*': {
    component: _404,
    auth: false
  }
})

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
