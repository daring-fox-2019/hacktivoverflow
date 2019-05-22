<template>
  <div class="container is-fluid">
    <div class="section">
      <template v-if="questions.length">
        <div class="columns is-centered">
          <div class="column">
            <QuestionListItem
              v-for="question in questions"
              :key="question._id"
              :question="question"
            />
          </div>
        </div>
      </template>
      <p v-else>There should be list of question here. If you see nothing, please <router-link to="/questions/new">ask here</router-link></p>
    </div>
  </div>
</template>

<script>
import QuestionListItem from './QuestionListItem'

export default {
  name: 'QuestionList',
  components: {
    QuestionListItem
  },
  computed: {
    questions: (vm) => vm.$store.state.question.all
  },
  created: function () {
    this.$store.dispatch('question/getAll')
  }
}
</script>

<style>
.column {
  max-width: 960px;
}
</style>
