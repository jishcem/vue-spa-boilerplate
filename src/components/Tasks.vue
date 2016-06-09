<template>
  <app-header></app-header>
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
  <app-footer></app-footer>
</template>
<script>
  import AppHeader from '../components/template/AppHeader'
  import AppFooter from '../components/template/AppFooter'
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
        this.$http.get('http://vueprojectserver.dev/api/tasks', (response) => {
          this.tasks = response
        })
      }
    }
  }

</script>
