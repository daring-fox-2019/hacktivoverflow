<template>
  <div class="home">
    <div class='container pt-5'>
      <div class='row d-flex justify-content-center pb-3'>
        <h2>Hacktiv Overflow</h2>
      </div>
      <div class='row d-flex flex-column'>
        <swapping-squares-spinner :animation-duration="1000" :size="65" color="#428bca" v-if='isLoading'/>
        <div v-if='!isLoading && searchResult.length === 0'>
          <div v-for='question in questions' :key='question.id' class='py-2'>
            <QuestionCard :question='question'/>
          </div>
        </div>
        <div v-if='!isLoading && searchResult.length > 0'>
          <div v-for='question in searchResult' :key='question.id' class='py-2'>
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
  props:['searchResult'],
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
        .get('/questions')
        .then(({ data })=>{
          this.questions = data.map(el=>{
            el.time = moment(el.createdAt).fromNow()
            return el
          })
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
