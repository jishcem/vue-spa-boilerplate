<template>
  <div>
    <div class="col-sm-10 col-sm-offset-1">
      <errors :errors="errors"></errors>
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
  import Utils from '../../utils'
  import Errors from '../template/Errors.vue'
  import NProgress from 'nprogress'
  import swal from 'sweetalert'

  export default {

    data () {
      return {
        newTask: null,
        errors: null
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
        swal('New task is created successfully')
      },

      handleError (response) {
        window.$('.save-button').button('reset')
        NProgress.done()
        this.errors = Utils.getErrorArray(response.data.errors)
      }
    },

    components: {
      AppHeader, AppFooter, Errors
    }
  }
</script>
