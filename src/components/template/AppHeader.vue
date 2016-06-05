<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Project name</a>
      </div>
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <li class="active">
            <a v-link="{ path: '/home' }">Home</a>
          </li>
          <li>
            <a v-link="{ path: '/about' }">About</a>
          </li>
          <li>
            <a v-link="{ path: '/contact' }">Contact</a>
          </li>
          <li>
            <a v-link="{ path: '/tasks' }">Tasks</a>
          </li>
          <li v-show="! userAuthenticated">
            <a v-link="{ path: '/login' }">Login</a>
          </li>
        </ul>

        <ul v-show="userAuthenticated" class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
              User
              <span class="caret"></span>
            </a>

            <ul class="dropdown-menu" role="menu">
              <li>
                <a v-link="{ path: '/logout' }">
                  <i class="fa fa-btn fa-fw fa-sign-out"></i>Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div><!--/.nav-collapse -->

    </div>
  </nav>
</template>
<script>
  export default {
    data () {
      return {
        authenticated: false
      }
    },

    computed: {
      userAuthenticated () {
        return window.localStorage.getItem('authenticated')
      }
    }
  }
</script>
