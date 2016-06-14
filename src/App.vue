<template>
  <div>
    <router-view class="view" transition="test" transition-mode="out" keep-alive></router-view>
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
      if (token !== null && token !== 'undefined') {
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
      },

      tryLogin () {
        this.$http.post('http://vueprojectserver.dev/api/me', {}).then((response) => this.login(response.data))
        .catch((err) => {
          if (err.data.error.toString() === 'token_expired') this.refreshUser()
        })
      },

      refreshUser () {
        this.$http.post('http://vueprojectserver.dev/api/refresh-token', {}).then((response) => {
          if (response.headers('Authorization').startsWith('Bearer ')) {
            window.localStorage.setItem('jwt-token', response.headers('Authorization').slice('Bearer '.length))
            this.tryLogin()
          }
        }).catch((err) => { console.log(err) })
      }
    }
  }
</script>
