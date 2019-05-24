<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-layout align-center justify-space-around row fill-height>
              <v-layout align-start justify-start column fill-height>
                <h4 class="pl-4">VOTER</h4>
                <v-btn class="pl-4" flat>
                  <v-icon large>fas fa-angle-up</v-icon>
                </v-btn>
                <div class="px-5">
                  <h1>{{question.upVote.length + question.downVote.length}}</h1>
                </div>
                <v-btn class="pl-4" flat>
                  <v-icon large>fas fa-angle-down</v-icon>
                </v-btn>
              </v-layout>
              <v-layout v-if="iduser === question.idUser._id" align-center justify-center row fill-height>
                <UpdateQuestion v-bind:updatequestion="question" @update="updateData" />
                <v-btn @click.prevent="deleted(question._id)" color="error">Delete</v-btn>
              </v-layout>
              <v-layout align-end justify-center column fill-height>
                <a href @click.prevent="showDetail(question._id)">
                  <h2 class="pa-2">{{question.title}}</h2>
                </a>
                <p>by: {{question.idUser.name}}</p>
                <h4 class="pl-1">Answer</h4>
                <h1>{{question.answers.length}}</h1>
              </v-layout>
            </v-layout>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import overflow from '@/api/overflow.js'
import UpdateQuestion from '@/components/UpdateQuestion.vue'
export default {
  props: ['question', 'iduser'],
  data () {
    return {
      detail: []
    }
  },
  components: {
    UpdateQuestion

  },
  methods: {
    showDetail () {
      this.$router.push('/detail/' + this.question._id)
    },

    updateData (newData) {
      this.$emit('update-data', newData, this.question._id)
    },
    deleted (id) {
      console.log(id)
      this.$emit('deleted-data', id)
    }
  }
}
</script>
