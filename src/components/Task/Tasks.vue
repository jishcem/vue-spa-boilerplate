<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <ul class="nav nav-tabs nav-justified">
          <li role="presentation" class="active"><a v-link="{ path: '/task' }">Tasks</a></li>
          <li role="presentation"><a v-link="{ path: '/task/create' }">Create New Task</a></li>
        </ul>
        <div class="col-sm-10 col-sm-offset-1">
          <div v-if="successMessage">
            <alert :message="successMessage"></alert>
          </div>
          <table class="table">
            <thead>
            <tr>
              <th>Task</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tr v-for="task in tasks">
              <td>{{ task.name }}</td>
              <td>
                <a class="btn btn-default" v-link="{ path: '/task/edit/' + task.id }" role="button">Edit</a>
                <a class="btn btn-default" v-on:click.prevent="removeTask(task.id)" href="#" role="button">Delete</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
  import AppHeader from '../template/AppHeader'
  import AppFooter from '../template/AppFooter'
  import Alert from '../template/Alert'
  import findIndex from 'lodash'
  import NProgress from 'nprogress'

  export default {

    ready () {
      this.getTasks()
    },

    data () {
      return {
        tasks: [],
        successMessage: ''
      }
    },

    components: {
      AppHeader, AppFooter, Alert
    },

    methods: {
      getTasks () {
        NProgress.start()
        this.$http.get(this.$root.serverUrl + 'task', (response) => {
          this.tasks = response.tasks
          NProgress.done()
        })
      },

      removeTask (id) {
        NProgress.start()
        this.tasks.splice(findIndex(this.tasks, (task) => Number(task.id) === id), 1)
        this.$http.post(this.$root.serverUrl + 'task/delete/' + id, {})
          .then(function (response) {
            console.log(response)
            NProgress.done()
          }, function (response) {
            console.log(response)
            NProgress.done()
          })
      }
    }
  }

</script>
