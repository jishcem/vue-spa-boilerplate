<template>
  <app-header></app-header>
  <div class="container">
    <div class="row">
      <ul class="nav nav-tabs nav-justified">
        <li role="presentation"><a v-link="{ path: '/task' }">Tasks</a></li>
        <li role="presentation" class="active"><a v-link="{ path: '/task/create' }">Create New Task</a></li>
      </ul>
      <div class="col-sm-10 col-sm-offset-1">
        <div class="alert alert-danger errorList" v-if="errors">
          <div v-for="error in errors" role="alert">{{ error }}</div>
        </div>
        <alert :message="successMessage"></alert>
        <h3>Create New Task</h3>
        <form v-on:submit.prevent="create">
          <div class="form-group">
            <label for="task_name">Task Name</label>
            <input v-model="task" type="text" class="form-control" id="task_name" placeholder="Task">
          </div>
          <button type="submit" class="btn btn-primary save-button">Submit</button>
        </form>
      </div>
    </div>
  </div>
  <app-footer></app-footer>
</template>
<style lang="sass" scoped>
  .errorList
    margin-top: 25px
</style>
<script>
  import AppHeader from '../template/AppHeader'
  import AppFooter from '../template/AppFooter'
  import Alert from '../template/Alert'

  export default {
    data () {
      return {
        task: null,
        errors: null,
        successMessage: null
      }
    },
    components: {
      AppHeader, AppFooter, Alert
    }
  }
</script>
