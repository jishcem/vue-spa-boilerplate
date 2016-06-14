<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <p>
          this is the contact page
        </p>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
  import AppHeader from '../components/template/AppHeader'
  import AppFooter from '../components/template/AppFooter'
  export default {
    components: {
      AppHeader, AppFooter
    }
  }
</script>
