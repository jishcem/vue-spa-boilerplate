import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
require('bootstrap/dist/css/bootstrap.css')
window.jQuery = window.$ = require('jquery/dist/jquery')
require('bootstrap')

Vue.use(VueRouter)
Vue.use(VueResource)

var VueApp = Vue.extend({})
var router = new VueRouter()

import Home from 'components/Home'
import About from 'components/About'
import Contact from 'components/Contact'
import Login from 'components/Login'
import Logout from 'components/Logout'
import _404 from 'components/404'
import Tasks from 'components/Tasks'

require('./styles/all.sass')

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

router.start(VueApp, 'body')

router.beforeEach(function (transition) {
  if (transition.to.auth) {
    if (window.localStorage.getItem('authenticated')) {
      transition.next()
    } else {
      transition.redirect('/login')
    }
  } else {
    transition.next()
  }
})
