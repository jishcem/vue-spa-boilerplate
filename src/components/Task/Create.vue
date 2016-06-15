<template>
  <div>
    <div class="col-sm-10 col-sm-offset-1">
      <div class="alert alert-danger errorList" v-if="errors">
        <div v-for="error in errors" role="alert">{{ error }}</div>
      </div>
      <alert :message="successMessage"></alert>
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
</template>
<style lang="sass" scoped>
  .errorList
    margin-top: 25px
</style>
<script>
  import AppHeader from '../template/AppHeader'
  import AppFooter from '../template/AppFooter'
  import Alert from '../template/Alert'
  import Utils from '../../utils'
  import NProgress from 'nprogress'

  export default {

    data () {
      return {
        newTask: null,
        errors: null,
        successMessage: null
      }
    },

    methods: {
      create () {
        this.errors = null
        NProgress.start()
        window.$('.save-button').button('loading')
        this.$http.post(this.$root.serverUrl + 'task', { name: this.newTask })
          .then((response) => this.handleSuccess(response))
          .catch((error) => this.handleError(error))
      },

      handleSuccess (response) {
        window.$('.save-button').button('reset')
        NProgress.done()
        this.newTask = ''
        this.successMessage = 'New task is created successfully'
      },

      handleError (errors) {
        window.$('.save-button').button('reset')
        NProgress.done()
        this.errors = Utils.getErrorArray(errors.data)
      }
    },

    components: {
      AppHeader, AppFooter, Alert
    }
  }
</script>
