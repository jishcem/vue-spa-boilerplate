<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <ul class="nav nav-tabs nav-justified">
          <li v-link-active role="presentation"><a v-link="{ path: '/task', exact: true, activeClass: 'active' }">Tasks</a></li>
          <li v-link-active role="presentation"><a v-link="{ path: '/task/create', activeClass: 'active' }">Create New Task</a></li>
        </ul>
        <router-view></router-view>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
  import AppHeader from '../template/AppHeader'
  import AppFooter from '../template/AppFooter'

  export default {
    components: {
      AppHeader, AppFooter
    }
  }

</script>
