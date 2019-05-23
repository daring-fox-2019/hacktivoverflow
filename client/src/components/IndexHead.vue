<template>
  <div class="hero is-primary">
    <div class="hero-head">
      <TheNavbar/>
    </div>
    <div class="hero-body">
      <div class="container is-fluid mt24">
        <div class="level-right">
          <IndexHeadForm/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from './TheNavbar.vue'
import IndexHeadForm from './IndexHeadForm.vue'

export default {
  name: 'IndexHead',
  components: {
    TheNavbar,
    IndexHeadForm
  }
}
</script>

<style>

</style>
