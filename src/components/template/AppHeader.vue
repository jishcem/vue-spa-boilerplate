<template>
  <nav class="navbar navbar-default navbar-static-top">
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
          <li v-link-active>
            <a v-link="{ path: '/home', activeClass: 'active' }">Home</a>
          </li>
          <li v-link-active>
            <a v-link="{ path: '/about', activeClass: 'active' }">About</a>
          </li>
          <li v-link-active>
            <a v-link="{ path: '/task', activeClass: 'active' }">Tasks</a>
          </li>
          <li v-link-active v-show="! $root.authenticated">
            <a v-link="{ path: '/login', activeClass: 'active' }">Login</a>
          </li>
        </ul>

        <ul v-if="$root.authenticated" class="nav navbar-nav navbar-right">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
              <span>
                {{ $root.user.name }}
              </span>
              <img v-bind:src="$root.user.gravatar" alt="" class="img-responsive gravatar">
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
<style lang="sass" scoped>
  .gravatar
    height: 25px
    display: inline-block
</style>
