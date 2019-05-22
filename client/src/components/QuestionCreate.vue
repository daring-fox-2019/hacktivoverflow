<template>
  <div>
    <QuestionForm
      form-title="New Question"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import QuestionForm from './QuestionForm.vue'

export default {
  name: 'QuestionCreate',
  components: {
    QuestionForm
  },
  methods: {
    onSubmit: function (question) {
      let payload = {
        title: question.title,
        description: question.description,
        tags: question.tags,
        author: this.$store.state.auth.user._id,
        token: this.$store.state.auth.token
      }

      this.$store.dispatch('question/create', payload)
      this.$router.push('/questions')
    }
  }
}
</script>

<style>
.ck-editor__editable_inline {
  min-height: 320px
}
</style>
