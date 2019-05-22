<template>
  <div class="columns">
    <div class="column is-narrow">
      <div class="columns">
        <div class="column">
          <div class="box has-text-centered pb4 pt8">
            <p class="is-size-4">{{totalVotes}}</p>
            <p class="has-text-grey">Votes</p>
          </div>
        </div>
        <div class="column">
          <div class="box has-text-centered pb4 pt8">
            <p class="is-size-4">{{totalAnswers}}</p>
            <p class="has-text-grey">Answers</p>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <a
        class="is-size-4"
        @click.prevent="onClickQuestion"
      >{{question.title}}</a>
      <div class="mt4">
        <a
          class="tag is-danger mr8"
          v-for="(tag, index) in question.tags"
          :key="index"
        >{{tag}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionListItem',
  props: {
    question: Object
  },
  computed: {
    totalVotes: function () {
      let { upvotes, downvotes } = this.question
      return upvotes.length - downvotes.length
    },
    totalAnswers: (vm) => vm.question.answers.length
  },
  methods: {
    onClickQuestion: function () {
      this.$store.dispatch('question/getById', this.question._id)
      this.$router.push(`/questions/` + this.question._id)
    }
  }
}
</script>

<style>

</style>
