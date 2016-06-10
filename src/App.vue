<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<style src="./styles/all.sass" lang="sass"></style>
<script>
  export default {
    ready () {
      this.$on('userLoggedIn', (user) => {
        this.user = user
        this.login()
      })

      this.$on('userLoggedOut', () => {
        this.logout()
      })

      var token = window.localStorage.getItem('jwt-token')
      if (token !== null && token !== 'undefined') {
        this.$http.get('http://vueprojectserver.dev/api/me', {}).then((response) => {
          console.log(response)
        }).catch((err) => { console.log(err) })
      }
    },

    data () {
      return {
        user: null,
        authenticated: null
      }
    },

    methods: {
      login () {
        this.authenticated = true
      },

      logout () {
        this.authenticated = false
        window.localStorage.removeItem('jwt-token')
      }
    }
  }
</script>
