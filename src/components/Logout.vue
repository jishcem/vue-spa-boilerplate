<script>
  export default {
    ready () {
      this.$dispatch('userLoggedOut')
      this.$router.go('/')
      window.location.reload()
    }
  }
</script>
<template>
  <div></div>
</template>
