<template>
  <div v-if="message" class="alert alert-warning alert-dismissible fade in" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    {{ message }}
  </div>
</template>
<script>
    export default {

      data () {
        return {}
      },

      props: ['message']
    }
</script>
