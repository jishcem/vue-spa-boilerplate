<template>
  <app-header></app-header>
  <div class="container">
    <div class="row">
      <ul class="nav nav-tabs nav-justified">
        <li role="presentation" class="active"><a v-link="{ path: '/task' }">Tasks</a></li>
        <li role="presentation"><a v-link="{ path: '/task/create' }">Create New Task</a></li>
      </ul>
      <div class="col-sm-10 col-sm-offset-1">
        <table class="table">
          <thead>
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tr v-for="task in tasks">
            <td>{{ task }}</td>
            <td>
              <a class="btn btn-default" href="#" role="button">Edit</a>
              <a class="btn btn-default" href="#" role="button">Delete</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <app-footer></app-footer>
</template>
<script>
  import AppHeader from '../template/AppHeader'
  import AppFooter from '../template/AppFooter'
  export default {

    ready () {
      this.getTasks()
    },

    data () {
      return {
        tasks: []
      }
    },

    components: {
      AppHeader, AppFooter
    },

    methods: {
      getTasks () {
        this.$http.get('http://vueprojectserver.dev/api/task', (response) => {
          this.tasks = response
        })
      }
    }
  }

</script>
