<template>
  <b-card>
    <div class='row'>
      <div class='col col-md-2 d-flex justify-content-around'>
        <div class='d-flex flex-column'>
          <h5 class='mb-0'>{{ question.upvotes.length - question.downvotes.length }}</h5>
          <p class='mb-0'>votes</p>
        </div>
        <div class='d-flex flex-column'>
          <h5 class='mb-0'>{{ answers.length }}</h5>
          <p class='mb-0'>answers</p>
        </div>
      </div>
      <div class='col col-md-7 d-flex justify-content-start'>
        <router-link :to='{name: "question page", params:{id: question._id}}' class='link'>
          <b-card-title class='mb-0 pt-2'>
            {{ question.title }}
          </b-card-title>
        </router-link>
      </div>
      <div class='col col-md-3 d-flex justify-content-around mt-3'>
        <p class='text-muted mb-0' style='font-size: 12px'>{{ question.time }}</p>
        <h6 class='mb-0' style='font-size: 14px'>By {{ question.userId.name }}</h6>
      </div>
    </div>
  </b-card>
</template>


<script>
import axios from '@/api/server/axios.js'
export default {
  name: 'QuestionCard',
  props: ['question'],
  data(){
    return{
      answers: []
    }
  },
  created(){
    axios
      .get(`/answers?questionId=${this.question._id}`)
      .then(({ data })=>{
        this.answers = data
      })
      .catch(err=>{
        console.log(err)
      })
  }
}
</script>

<style scoped>
a:hover{
  text-decoration: none;
}
</style>

