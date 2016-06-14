<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <p>
          sorry, the url you are looking for does not exist!!!
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
