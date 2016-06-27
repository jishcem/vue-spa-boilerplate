<template>
  <div class="loginpage">
    <div class="container">
      <errors :errors="errors"></errors>
      <form v-on:submit.prevent="register" class="form-signin">
        <h2 class="form-signin-heading">Register</h2>
        <label for="inputName" class="sr-only">Name</label>
        <input v-model="name" type="text" id="inputName" class="form-control" placeholder="Name">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password">
        <button class="btn btn-lg btn-primary btn-block register-button" data-loading-text="Signing up..." type="submit">Register</button>
      </form>

    </div> <!-- /container -->
  </div>
</template>
<style scoped>
  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
</style>
<script>
  import Utils from '../utils'
  import NProgress from 'nprogress'
  import Errors from './template/Errors'
  export default {
    data () {
      return {
        name: '',
        email: '',
        password: '',
        errors: []
      }
    },

    components: {
      Errors
    },

    methods: {
      register () {
        NProgress.start()
        window.$('.register-button').button('loading')
        this.$http.post('http://vueprojectserver.dev/api/register', { name: this.name, email: this.email, password: this.password }).then((response) => {
          window.$('.register-button').button('reset')
          if (response.ok) {
            window.localStorage.setItem('jwt-token', response.data.token)
            window.localStorage.setItem('user', JSON.stringify(response.data.user))
            this.$dispatch('userLoggedIn', response.data.user)
            NProgress.done()
            this.$router.go('/home')
          } else {
            this.error = true
            NProgress.done()
          }
        }).catch((errors) => {
          this.errors = Utils.getErrorArray(errors.data.errors)
          window.$('.register-button').button('reset')
          NProgress.done()
        })
      }
    }
  }
</script>
