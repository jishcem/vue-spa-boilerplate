<template>
  <div class="col-sm-10 col-sm-offset-1">
    <table v-if="tasks.length" class="table">
      <thead>
      <tr>
        <th>Task</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tr v-bind:disabled="task.modifying" v-for="task in tasks">
        <td>{{ task.name }}</td>
        <td>
          <a class="btn btn-default" v-link="{ path: '/task/edit/' + task.id }" role="button">Edit</a>
          <a class="btn btn-default" v-on:click.prevent="removeTask(task.id, $event)" href="#" role="button">Delete</a>
        </td>
      </tr>
    </table>
    <div class="no-tasks" v-if="dataLoaded && !tasks.length">
      <p class="alert-info">There are no tasks</p>
    </div>
  </div>
</template>
<style lang="sass" scoped>
  .no-tasks
    margin: 25px
    p
      padding: 25px
</style>
<script>
  import Alert from '../template/Alert'
  import _ from 'lodash'
  import NProgress from 'nprogress'
  import swal from 'sweetalert'

  export default {

    ready () {
      this.getTasks()
    },

    data () {
      return {
        tasks: [],
        dataLoaded: false
      }
    },

    components: {
      Alert
    },

    methods: {
      getTasks () {
        NProgress.start()
        this.$http.get(this.$root.serverUrl + 'task', {}).then((response) => {
          this.tasks = response.data.tasks
          this.dataLoaded = true
          NProgress.done()
        })
      },

      removeTask (id, $event) {
        window.$($event.target).closest('tr').addClass('warning')
        NProgress.start()
        this.$http.post(this.$root.serverUrl + 'task/delete/' + id, {})
          .then(function (response) {
            let taskIndex = _.findIndex(this.tasks, {id: id})
            this.tasks.splice(taskIndex, 1)
            swal('Task is deleted successfully')
            NProgress.done()
          }, function (response) {
            window.$($event.target).closest('tr').removeClass('warning')
            swal('There was some problem deleting the task...')
            NProgress.done()
          })
      }
    }
  }
</script>
