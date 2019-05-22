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
                <h1>{{question.upVote + question.downVote}}</h1>
              </div>
              <v-btn class="pl-4" flat>
                <v-icon large>fas fa-angle-down</v-icon>
              </v-btn>
            </v-layout>
            <v-layout align-end justify-center column fill-height>
                <a href="" @click.prevent="fetchDetail(question._id)"><h2 class="pa-2">{{question.title}}</h2></a>
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
export default {
  props: ["question"],
  data(){
      return{
          detail: []
      }
  },
  methods: {
      fetchDetail(id){
          this.$emit('get-detail', id, true)
      }

  }
};
</script>
