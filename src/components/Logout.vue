<script>
  export default {
    ready () {
      window.localStorage.removeItem('authenticated')
      this.$router.go('home')
    }
  }
</script>
