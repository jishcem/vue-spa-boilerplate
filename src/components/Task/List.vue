<template>
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
</template>
<script>
  import Alert from '../template/Alert'
  import _ from 'lodash'
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
      Alert
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
        let taskIndex = _.findIndex(this.tasks, {id: id})
        this.tasks.splice(taskIndex, 1)
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
