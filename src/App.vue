<template>
  <div>
    <router-view keep-alive></router-view>
  </div>
</template>
<style src="./styles/all.sass" lang="sass"></style>
<script>
  export default {
    ready () {
      this.$on('userLoggedIn', (user) => {
        this.login(user)
      })

      this.$on('userLoggedOut', () => {
        this.logout()
      })

      var token = window.localStorage.getItem('jwt-token')
      if (
        token !== null &&
        token !== 'undefined'
      ) {
        this.tryLogin()
      }
    },

    data () {
      return {
        user: null,
        authenticated: null,
        serverUrl: 'http://vueprojectserver.dev/api/'
      }
    },

    methods: {
      login (user) {
        this.user = user
        this.authenticated = true
      },

      logout () {
        this.authenticated = false
        window.localStorage.removeItem('jwt-token')
        window.localStorage.removeItem('user')
      },

      tryLogin () {
        if (window.localStorage.getItem('user')) {
          this.login(JSON.parse(window.localStorage.getItem('user')))
          return
        }
        this.$http.post('http://vueprojectserver.dev/api/me', {}).then((response) => this.login(response.data))
        .catch(() => this.$router.go('/login'))
      }
    }
  }
</script>
