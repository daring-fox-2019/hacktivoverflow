<template>
  <div>
    <TheNavbar/>
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'

export default {
  name: 'QuestionPage',
  components: {
    TheNavbar
  }
}
</script>

<style>

</style>
