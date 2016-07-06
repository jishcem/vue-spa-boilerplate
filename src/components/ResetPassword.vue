<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3 text-center">
          <errors :errors="errors"></errors>
          <form v-on:submit.prevent="submit" class="form-signin">
            <h2 class="form-signin-heading">Reset your Password ?</h2>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" autofocus>
            <br>
            <label for="inputPassword" class="sr-only">Password</label>
            <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password">
            <br>
            <label for="inputPasswordConfirm" class="sr-only">Confirm Password</label>
            <input v-model="password_confirm" type="password" id="inputPasswordConfirm" class="form-control" placeholder="Confirm Password">
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
  import Utils from '../utils'
  import Errors from './template/Errors.vue'

  export default {
    components: {
      AppHeader, AppFooter, Errors
    },

    ready () {
      this.email = this.$route.query.email
      this.token = this.$route.params.token
    },

    data () {
      return {
        email: null,
        token: null,
        password: null,
        password_confirm: null,
        errors: null
      }
    },

    methods: {

      submit () {
        NProgress.start()
        window.$('.password-button').button('loading')
        this.$http.post(this.$root.serverUrl + 'password/reset',
          {
            email: this.email,
            token: this.token,
            password: this.password,
            password_confirmation: this.password_confirm
          }
        ).then((response) => {
          window.$('.password-button').button('reset')
          console.log(response)
          NProgress.done()
          this.$router.go('/login')
        }).catch((error) => {
          console.log(error)
          this.error = true
          window.$('.password-button').button('reset')
          NProgress.done()
          this.errors = Utils.getErrorArray(error.data.errors)
        })
      }
    }
  }
</script>
