<template>
  <div class="container is-fluid">
    <div class="section ml0">
      <p class="title">{{question.title}}</p>
      <hr>
      <div class="columns">
        <div class="column is-narrow pr24">
          <button
            class="button is-medium is-light"
            :disabled="!canUpvotesQuestion"
            @click="onClickUpvotesQuestion"
          >
            <span class="icon">
              <i class="fas fa-chevron-up"></i>
            </span>
          </button>
          <p
            class="has-text-centered mt8 mb8 is-size-4 has-text-weight-bold has-text-grey-light"
          >
            {{totalVotes}}
          </p>
          <button
            class="button is-medium is-light"
            :disabled="!canDownvotesQuestion"
            @click="onClickDownvotesQuestion"
          >
            <span class="icon">
              <i class="fas fa-chevron-down"></i>
            </span>
          </button>
        </div>
        <div class="column">
          <div v-html="question.description"></div>
          <div class="level mt56">
            <div class="level-level">
              <a
                class="tag is-danger is-medium mr8"
                v-for="(tag, index) in question.tags"
                :key="index"
                @click="onClickTag(tag)"
              >{{tag}}</a>
            </div>
            <div
              v-if="isQuestionAuthor"
              class="levl-right has-text-grey"
            >
              <div class="buttons">
                <router-link
                  class="button has-text-grey-light is-text"
                  :to="'/questions/' + question._id + '/edit'"
                >
                  edit
                </router-link>
                <a
                  href="#"
                  class="button has-text-grey-light is-text"
                  @click.prevent="onClickDeleteQuestion"
                >delete</a>
              </div>
            </div>
            <span
              class="level-right has-text-grey-light"
              v-else
            >
              asked by {{question.author.email}}
            </span>
          </div>
        </div>
      </div>
      <template v-if="question.answers.length">
        <p class="is-size-4 has-text-grey-light mt56">
          {{question.answers.length}} Answers
        </p>
        <hr>
        <div
          class="columns"
          v-for="answer in question.answers"
          :key="answer._id"
        >
          <div class="column is-narrow pr16">
            <button
              class="button is-medium is-light"
              :disabled="!canUpvotesAnswer(answer)"
              @click="onClickUpvotesAnswer(answer._id)"
            >
              <span class="icon">
                <i class="fas fa-chevron-up"></i>
              </span>
            </button>
            <p
              class="has-text-centered mt8 mb8 is-size-4 has-text-weight-bold has-text-grey-light"
            >{{getAnswerTotalVotes(answer)}}</p>
            <button
              class="button is-medium is-light"
              :disabled="!canDownvotesAnswer(answer)"
              @click="onClickDownvotesAnswer(answer._id)"
            >
              <span class="icon">
                <i class="fas fa-chevron-down"></i>
              </span>
            </button>
          </div>
          <div class="column">
            <div
              v-html="answer.description"
              class="mb128"
            ></div>
            <p class="has-text-right has-text-grey-light">
              answered by {{answer.author.email}}
            </p>
          </div>
        </div>
      </template>
      <hr>
      <div class="columns">
        <div class="column is-12">
          <p class="mb16 mt16 is-size-4 has-text-grey-light">Your Answer</p>
          <form @submit.prevent="onSubmit">
            <ckeditor
              v-model="description"
              :editor="editor"
            />
            <button class="button is-success is-medium mt32">
              Post Your Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'QuestionDetail',
  data: function () {
    return {
      editor: ClassicEditor,
      description: '',
    }
  },
  computed: {
    isLoggedIn: (vm) => vm.$store.getters['auth/isLogin'],
    question: (vm) => vm.$store.state.question.select,
    totalVotes: (vm) => vm.question.upvotes.length - vm.question.downvotes.length,
    isQuestionAuthor: (vm) => vm.question.author._id === vm.$store.state.auth.user._id,
    canUpvotesQuestion: function () {
      let isAuthor = this.$store.state.auth.user._id === this.question.author._id
      let hasUpvotes = this.question.upvotes
        .indexOf(this.$store.state.auth.user._id)

      return this.isLoggedIn && !isAuthor && hasUpvotes === -1
    },
    canDownvotesQuestion: function () {
      let isAuthor = this.$store.state.auth.user._id === this.question.author._id
      let hasDownvotes = this.question.downvotes
        .indexOf(this.$store.state.auth.user._id)

      return this.isLoggedIn && !isAuthor && hasDownvotes === -1
    }
  },
  created: function () {
    let question = this.$store.state.question.select

    if (!question._id) {
      this.$store.dispatch('question/getById', this.$route.params.question_id)
    }
  },
  methods: {
    onSubmit: function () {
      let payload = {
        description: this.description,
        token: this.$store.state.auth.token,
        questionId: this.question._id
      }

      this.$store.dispatch('question/addAnswer', payload)
      this.description = ''
    },
    onClickUpvotesQuestion: function () {
      if (this.isLoggedIn) {
        let payload = {
          votes: 'upvotes',
          token : this.$store.state.auth.token,
          questionId: this.question._id
        }
        this.$store.dispatch('question/addVotes', payload)
      }
    },
    onClickDownvotesQuestion: function () {
      if (this.isLoggedIn) {
        let payload = {
          votes: 'downvotes',
          token: this.$store.state.auth.token,
          questionId: this.question._id
        }
        this.$store.dispatch('question/addVotes', payload)
      }
    },
    getAnswerTotalVotes: function (answer) {
      return answer.upvotes.length - answer.downvotes.length
    },
    onClickUpvotesAnswer: function (answerId) {
      if (this.isLoggedIn) {
        let payload = {
          votes: 'upvotes',
          token : this.$store.state.auth.token,
          questionId: this.question._id,
          answerId
        }
        this.$store.dispatch('question/addAnswerVotes', payload)
      }
    },
    onClickDownvotesAnswer: function (answerId) {
      if (this.isLoggedIn) {
        let payload = {
          votes: 'downvotes',
          token: this.$store.state.auth.token,
          questionId: this.question._id,
          answerId
        }
        this.$store.dispatch('question/addAnswerVotes', payload)
      }
    },
    canUpvotesAnswer: function (answer) {
      let isAuthor = this.$store.state.auth.user._id === answer.author._id
      let hasUpvotes = answer.upvotes.indexOf(this.$store.state.auth.user._id)

      return this.isLoggedIn && !isAuthor && hasUpvotes === -1
    },
    canDownvotesAnswer: function (answer) {
      let isAuthor = this.$store.state.auth.user._id === answer.author._id
      let hasDownvotes = answer.downvotes.indexOf(this.$store.state.auth.user._id)

      return this.isLoggedIn && !isAuthor && hasDownvotes === -1
    },
    onClickDeleteQuestion: function () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('question/delete')
            .then(() => {
              Swal.fire(
                'Deleted!',
                'Your Question has been deleted.',
                'success'
              )
              this.$router.push('/questions')
            })
            .catch(err => console.log(err))
        }
      })
    },
    onClickTag: function (tag) {
      if (this.isLoggedIn) {
        if (this.$store.state.auth.user.tags.indexOf(tag) === -1) {
          let payload = {
            token: this.$store.state.auth.token,
            tags: [...this.$store.state.auth.user.tags, tag]
          }

          this.$store.dispatch('auth/updateTags', payload)

          Swal.fire({
            type: 'success',
            title: 'Tag added',
            text: `Tag '${tag}' is added into your watched tags`
          })
        } else {
          Swal.fire({
            type: 'info',
            text: 'You already watched this tag'
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.section {
  max-width: 960px;
}
</style>
