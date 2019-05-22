<template>
  <v-container>
      <a href="" @click.prevent="backTo"> <v-icon large>fas fa-long-arrow-alt-left</v-icon></a>
    <v-layout>
      <v-flex xs3>
        <v-card flat>
          <v-layout align-center justify-start column fill-height>
            <h4 class="text-md-center">VOTES</h4>
            <v-btn class="text-md-center" flat>
              <v-icon large>fas fa-angle-up</v-icon>
            </v-btn>
            <div class="text-md-center">
              <h1 class="text-md-center">{{detail.upVote + detail.downVote}}</h1>
            </div>
            <v-btn class="text-md-center" flat>
              <v-icon large>fas fa-angle-down</v-icon>
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs9>
        <v-card>
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
export default {
  props: ["detail"],
  components: {
      Answers
  },
  methods:{
      backTo(){
          this.$emit('backHome')
      }
  }

};
</script>
