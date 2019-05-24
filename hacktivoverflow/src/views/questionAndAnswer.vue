<template>
  <div class="questionAndAnswer">
    <navbar/>
    <v-container>
      <v-card class="pa-4" color="teal lighten-3">
      <v-card-title class="display-1 justify-center orange--text mb-4">
        <v-card class="pa-3">
            <h4>{{question.title}}</h4>
            <h6>{{question.description}}</h6>
        </v-card>
      </v-card-title>
      <answerCard class="mb-5" v-for="answer in answers" :key="answer._id" v-bind:answer="answer" v-bind:question="question"/>
      </v-card>
    </v-container>
  </div>
</template>
<script>
  import navbar from '../components/navbar'
  import answerCard from '../components/answerCard'
  import axios from 'axios'
  export default {
    data(){
      return{
        answers : [],
        questionId : this.$route.params.questionid,
        question : ''
      }
    },
    components : {
       navbar,
       answerCard
     },
     computed : {
        isQuestion : function(){
           return this.$store.state.question
        } 
     },
     watch : {
         isQuestion(){
             console.log('triggered is answer');
             if(this.isQuestion !== null && this.isQuestion !== undefined){
                 console.log('ini is question',this.isQuestion);
                 
                 this.answers = this.isQuestion
                 console.log('ini this answers',this.answers);
             }
         }
     },
     created(){
        axios({
          method: 'get',
          url : `http://localhost:3000/questions/${this.questionId}`,
          headers : {
            token : localStorage.token
          }
        })
        .then(({data})=>{
          console.log('darii axios qANDa',data);
          this.question = data
        })
        .catch(err =>{
          console.log(err);
        })
        this.$store.dispatch('getQuestionAnswer',this.questionId)
    }
  }
</script>
