<template>
  <v-container>
    <v-layout>
      <v-flex xs3>
        <v-card flat>
          <v-layout align-center justify-start column fill-height>
            <h4 class="text-md-center">VOTES</h4>
            <v-btn class="text-md-center" flat>
              <v-icon large>fas fa-angle-up</v-icon>
            </v-btn>
            <div class="text-md-center">
              <h1 class="text-md-center">{{detail.upVote.length + detail.downVote.length}}</h1>
            </div>
            <v-btn class="text-md-center" flat>
              <v-icon large>fas fa-angle-down</v-icon>
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs9>
        <v-card>
           <CreateAnswer v-on:add-data-answer="createAnswer"/>
          <v-layout align-center justify-start column fill-height>
              <v-card-title primary-title>
                <div>
                  <div class="headline text-md-center pb-2">{{detail.title}}</div>
                 <p>{{detail.description}}</p>
                </div>
              </v-card-title>
          </v-layout>
          <h3 class="pl-2">{{detail.answers.length}} Answers</h3>
          <Answers v-for="(answer, index) in detail.answers" :answer="answer" :key="index"/>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Answers from '@/components/Answers.vue'
import overflow from '@/api/overflow'
import CreateAnswer from '@/components/CreateAnswer.vue'
export default {
  components: {
    Answers,
    CreateAnswer
  },
  data () {
    return {
      detail: {
        answers: [],
        upVote: [],
        downVote: []
      }
    }
  },
  mounted () {
    this.getDetail(this.$route.params.id)
  },
  methods: {
    backTo () {
      this.$emit('backHome')
    },
    createAnswer (text) {
      overflow.post(`/answer`, {
        description: text,
        idQuestion: this.detail._id
      }, { headers: {
        token: localStorage.token
      } })
        .then(({ data }) => {
          this.$router.push('/detail/' + this.detail._id)
          this.detail.answers.push(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetail (id) {
      overflow.get(`/${id}`)
        .then(({ data }) => {
          this.detail = data
          console.log(this.detail)

          if (!this.detail.answers) {
            this.detail.answers = []
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
</script>
