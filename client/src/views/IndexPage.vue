<template>
  <div>
    <IndexHead/>
    <QuestionList/>
  </div>
</template>

<script>
import IndexHead from '../components/IndexHead.vue'
import QuestionList from '../components/QuestionList.vue'

export default {
  name: 'IndexPage',
  components: {
    IndexHead,
    QuestionList
  }
}
</script>

<style>

</style>
