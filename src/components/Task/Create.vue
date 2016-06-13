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
        <h3>Create New Task</h3>
        <form v-on:submit.prevent="create">
          <div class="form-group">
            <label for="task_name">Task Name</label>
            <input v-model="newTask" type="text" class="form-control" id="task_name" placeholder="New Task">
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
  import Utils from '../../utils'

  export default {

    data () {
      return {
        newTask: '',
        errors: null
      }
    },

    methods: {
      create () {
        window.$('.save-button').button('loading')
        this.$http.post(this.$root.serverUrl + 'task')
          .then((response) => this.handleSuccess(response))
          .catch((error) => this.handleError(error))
      },

      handleSuccess (response) {
        window.$('.save-button').button('reset')
        console.log(response)
      },

      handleError (errors) {
        window.$('.save-button').button('reset')
        this.errors = Utils.getErrorArray(errors.data)
      }
    },

    components: {
      AppHeader, AppFooter
    }
  }
</script>
