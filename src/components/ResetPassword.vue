<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3 text-center">
          <form v-on:submit.prevent="submit" class="form-signin">
            <h2 class="form-signin-heading">Reset your Password ?</h2>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
            <br>
            <label for="inputPassword" class="sr-only">Password</label>
            <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
            <br>
            <label for="inputPasswordConfirm" class="sr-only">Confirm Password</label>
            <input v-model="password_confirm" type="password" id="inputPasswordConfirm" class="form-control" placeholder="Confirm Password" required>
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

    ready () {
      this.email = this.$route.query.email
      this.token = this.$route.params.token
    },

    data () {
      return {
        email: null,
        token: null,
        password: null,
        password_confirm: null
      }
    },

    methods: {

      submit () {
        NProgress.start()
        window.$('.password-button').button('loading')
        this.$http.post('http://vueprojectserver.dev/api/password/reset',
          {
            email: this.email,
            token: this.token,
            password: this.password,
            password_confirm: this.password_confirm
          }
        ).then((response) => {
          window.$('.password-button').button('reset')
          console.log(response)
          NProgress.done()
        }).catch((error) => {
          console.log(error)
          this.error = true
          window.$('.password-button').button('reset')
          NProgress.done()
        })
      }
    }
  }
</script>
