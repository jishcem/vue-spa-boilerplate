<template>
  <div class="loginpage">
    <div class="container">
      <div class="alert alert-danger errorList" v-if="errors">
        <div v-for="error in errors" role="alert">{{ error }}</div>
      </div>
      <form v-on:submit.prevent="register" class="form-signin">
        <h2 class="form-signin-heading">Register</h2>
        <label for="inputName" class="sr-only">Name</label>
        <input v-model="name" type="text" id="inputName" class="form-control" placeholder="Name" required>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
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
  .errorList {
    margin-top: 25px;
  }
</style>
<script>
  import NProgress from 'nprogress'
  export default {
    data () {
      return {
        name: '',
        email: '',
        password: '',
        error: false
      }
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
        }).catch(() => {
          this.error = true
          window.$('.register-button').button('reset')
          NProgress.done()
        })
      }
    }
  }
</script>
