<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3 text-center">
          <form v-on:submit.prevent="submit" class="form-signin">
            <h2 class="form-signin-heading">Forgot your Password ?</h2>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
            <br>
            <button class="btn btn-lg btn-primary btn-block password-button" data-loading-text="Sending request..." type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '../components/template/AppHeader'
  import AppFooter from '../components/template/AppFooter'
  import NProgress from 'nprogress'
  export default {
    components: {
      AppHeader, AppFooter
    },

    data () {
      return {
        email: null
      }
    },

    methods: {
      submit () {
        NProgress.start()
        window.$('.password-button').button('loading')
        this.$http.post('http://vueprojectserver.dev/api/password', { email: this.email }).then((response) => {
          window.$('.password-button').button('reset')
          console.log(response)
          NProgress.done()
        }).catch(() => {
          this.error = true
          window.$('.password-button').button('reset')
          NProgress.done()
        })
      }
    }
  }
</script>
