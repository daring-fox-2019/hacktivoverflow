<template>
  <div class="container is-fluid">
    <div class="section">
      <template v-if="questions.length">
        <div class="columns is-centered">
          <div class="column">
            <div
              v-if="userHasTags"
              class="media"
            >
              <p class="media-left">
                Watched Tags :
              </p>
              <div class="media-content">
                <a
                  v-for="(tag, index) in $store.state.auth.user.tags"
                  :key="index"
                  class="tag is-medium is-danger"
                  @click="onClickTag(tag)"
                >
                  {{tag}}
                  <button
                    class="delete"
                    @click="onClickDeleteTag(tag)"
                  ></button>
                </a>
              </div>
            </div>
            <hr>
            <QuestionListItem
              v-for="question in questions"
              :key="question._id"
              :question="question"
            />
          </div>
        </div>
      </template>
      <p v-else>No question yet.</p>
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
    questions: (vm) => vm.$store.state.question.all,
    userHasTags: (vm) => vm.$store.getters['auth/hasTags']
  },
  created: function () {
    this.$store.dispatch('question/getAll')
  },
  methods: {
    onClickTag: function (tag) {
      this.$store.dispatch('question/search', tag)
    },
    onClickDeleteTag: function (tag) {
      let payload = {
        token: this.$store.state.auth.token,
        tags: this.$store.state.auth.user.tags.filter(t => t !== tag)
      }

      this.$store.dispatch('auth/updateTags', payload)

      Swal.fire({
        type: 'success',
        title: 'Tag deleted',
        text: `Tag '${tag}' is deleted from your watched tags`
      })
    }
  }
}
</script>

<style>
.column {
  max-width: 960px;
}
</style>
