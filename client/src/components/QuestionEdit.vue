<template>
  <div>
    <QuestionForm
      form-title="Edit Question"
      :question="question"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import QuestionForm from './QuestionForm.vue'
import question from '../api/question.js'

export default {
  name: 'QuestionEdit',
  components: {
    QuestionForm
  },
  data: function () {
    return {
      question: {}
    }
  },
  created: function () {
    question
      .fetchById(this.$route.params.question_id)
      .then(({ data }) => this.question = data.question)
      .catch((err) => console.log(err))
  },
  methods: {
    onSubmit: function (question) {
      let payload = {
        questionId: this.question._id,
        title: question.title,
        description: question.description,
        tags: question.tags,
        token: this.$store.state.auth.token
      }

      this.$store.dispatch('question/update', payload)
    }
  }
}
</script>

<style>
.ck-editor__editable_inline {
  min-height: 320px
}
</style>
