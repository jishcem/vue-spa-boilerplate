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
        this.$http.get(this.$root.serverUrl + 'task', (response) => {
          this.tasks = response.tasks
        })
      },

      removeTask (id) {
        this.$http.post(this.$root.serverUrl + 'task/delete/' + id, {})
          .then((response) => console.log(response))
          .catch((response) => console.log(response))
      }
    }
  }

</script>
