import Home from 'components/Home'
import About from 'components/About'
import Login from 'components/Login'
import Logout from 'components/Logout'
import _404 from 'components/404'
import Tasks from 'components/Task/Tasks'
import TaskList from 'components/Task/List'
import TaskCreate from 'components/Task/Create'
import TaskEdit from 'components/Task/Edit'
import NProgress from 'nprogress'

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
      auth: true,
      subRoutes: {
        '/': {
          component: TaskList
        },
        '/create': {
          component: TaskCreate
        },
        '/edit/:id': {
          component: TaskEdit
        }
      }
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
      NProgress.start()
      transition.next()
    }
  })

  router.afterEach(function (transition) {
    NProgress.done()
  })
}
