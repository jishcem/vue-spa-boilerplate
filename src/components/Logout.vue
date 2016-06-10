<script>
  export default {
    ready () {
      this.$dispatch('userLoggedOut')
      this.$router.go('home')
    }
  }
</script>
