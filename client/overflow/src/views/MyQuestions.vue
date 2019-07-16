<template>
  <div class="myQuestions">
    <div class='container pt-5'>
      <div class='row d-flex justify-content-center pb-3'>
        <h2>Your questions</h2>
      </div>
      <div class='row d-flex flex-column'>
        <div class='d-flex justify-content-center'>
          <swapping-squares-spinner :animation-duration="1000" :size="65" color="#428bca" v-if='isLoading'/>

        </div>
        <div v-if='!isLoading'>
          <div v-for='question in questions' :key='question.id' class='py-2'>
            <QuestionCard :question='question'/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionCard from '@/components/QuestionCard.vue'
import axios from '@/api/server/axios.js'
import moment from 'moment'
import { SwappingSquaresSpinner } from "epic-spinners";
export default {
  name: 'home',
  components: {
    QuestionCard,
    SwappingSquaresSpinner
  },
  data(){
    return {
      questions: [],
      isLoading: false
    }
  },
  methods: {
    getQuestion(){
      this.isLoading = true
      axios
        .get(`/questions?userId=${this.$store.state.user._id}`)
        .then(({ data })=>{
          this.questions = data.map(el=>{
            el.time = moment(el.createdAt).fromNow()
            return el
          })
          console.log(this.questions)
          
          this.isLoading = false
        })
    }
  },
  created(){
    this.getQuestion()
    this.$store.dispatch('loggedIn')
  }
}
</script>
