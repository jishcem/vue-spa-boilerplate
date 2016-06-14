import Home from 'components/Home'
import About from 'components/About'
import Contact from 'components/Contact'
import Login from 'components/Login'
import Logout from 'components/Logout'
import _404 from 'components/404'
import Tasks from 'components/Task/Tasks'
import TaskCreate from 'components/Task/Create'
import TaskEdit from 'components/Task/Edit'

export default function configRouter (router) {
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
    '/task': {
      component: Tasks,
      auth: true
    },
    '/task/create': {
      component: TaskCreate,
      auth: true
    },
    '/task/edit/:id': {
      component: TaskEdit,
      auth: true
    },
    '*': {
      component: _404,
      auth: false
    }
  })

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
}
