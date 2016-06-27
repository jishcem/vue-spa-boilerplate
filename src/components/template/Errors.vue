<template>
  <div class="alert alert-danger errorList" v-if="errors.length">
    <div v-for="error in errors" role="alert">{{ error }}</div>
  </div>
</template>
<style scoped>
  .errorList {
    margin-top: 25px;
  }
</style>
<script>
  export default {
    props: ['errors']
  }
</script>
