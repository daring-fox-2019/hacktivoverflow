<template>
  <div class="home">
    <navbar/>
    <v-container>
      <v-card class="pa-4" color="teal lighten-3">
      <v-card-title class="display-1 justify-center orange--text mb-4">
        <h1>Question List</h1>
      </v-card-title>
      <questioncard class="mb-5" v-for="(question) in questions" :key="question._id" v-bind:question="question"/>
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
        questions : []
      }
    },
    computed : {
      isQuestions : function(){
        return this.$store.state.allQuestions
      }
    },
    watch : {
      isQuestions(){
        if(this.isQuestions.length !== 0 ){
          this.questions = this.isQuestions 
        }
        // console.log('this is questions',this.questions);
        // console.log('ini questions di home',this.isQuestions);        
      }
    },
    components : {
       navbar,
       questioncard
     },
     created(){
        // this.questions = []
        // let temp = []
        // axios({
        //     method : 'get',
        //     url : "http://localhost:3000/questions"
        // })
        // .then(({data}) =>{
        //     console.log('ini dari created question card',data);
        //     data.forEach(element => {
        //         temp.push(element)
        //     });
        //     this.questions = temp
        // })
        // .catch(err =>{
        //     console.log(err);
        // })
        this.$store.dispatch('getQuestion')
    }
  }
</script>
