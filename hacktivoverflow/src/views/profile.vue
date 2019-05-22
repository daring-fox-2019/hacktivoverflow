<template>
  <div class="profile">
    <navbar/>
    <v-container>
      <v-card class="pa-4" color="teal lighten-3">
      <v-card-title class="display-1 justify-center orange--text mb-4">
        <h1>Your Question List</h1>
      </v-card-title>
      <questioncard class="mb-5" v-for="question in isQuestions" :key="question._id" v-bind:question="question" />
      </v-card>
    </v-container>
  </div>
</template>
<script>
  import navbar from '../components/navbar'
  import questioncard from '../components/questioncard'
  import axios from 'axios'
  export default {
    data(){
      return{
        questions : [],
        answers : []
      }
    },
    components : {
       navbar,
       questioncard
     },
     computed : {
        isQuestions : function()
         {
           return this.$store.state.myquestionList
        },
        isAnswers : function(){
           return this.$store.state.myanswerList
        } 
     },
     watch : {
         isQuestions(){
             console.log('trigerred is questions');
             if(this.isQuestions.length !== 0){
                 this.questions = this.isQuestions
             }
             
         },
         isAnswer(){
             console.log('triggered is answer');
             if(this.isAnswers.length !== 0){
                 this.answers = this.isAnswers
             }
         }
     },
     created(){
         this.$store.dispatch('getmyQuestion'),
         this.$store.dispatch('getmyAnswer')
    }
  }
</script>
