<template>
<div>
  <div class="container bg-light mt-2">
    <p>Advertisement Make UP from maybelline </p>
    <hr>
    <p> {{ showAds }} </p>
  </div>
  <div class="container mt-5 p-5" style="background-color:#EEECEC; height:100%">
    <div class="list-group">
      <div class="d-flex justify-content-between ml-2">
        <div class="col-2">
            <p>VOTES</p>
        </div>
        <div class="col-8">
            <p>TITLE</p>
        </div>
        <div class="col-2">
            <p>USER</p>
        </div>
      </div> 
      <a  v-for= "(question,index) in questions" :key ="index" href="#" class="list-group-item list-group-item-action " v-on:click.prevent= "detail(question._id)">
      <div class="d-flex justify-content-between">
        <div class="col-2">
            <p>{{ question.upVotes.length + question.downVotes.length }}</p>
        </div>
        <div class="col-8">
            <p >{{ question.title }}</p>
        </div>
        <div class="col-2">
            <p>{{ question.username }}</p>
        </div>
        </div> 
      </a>
    </div>
  </div>
</div>
</template>

<script>
import axios from '@/api/server.js'

export default {
  name: 'home',
  data () {
    return {
      questions : [],
      adsAPI : '',
      showAds : '',
      index : 0
    }
  },
  components: {
  },
  methods : {
    detail (questionId) {
      this.$router.push('/detail/' + questionId)
    },
     cron() {
      const { CronJob } = require("cron");
      new CronJob(
        "*/10 * * * * *",
        () => {
          axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
          .then((data) =>{
            let API = data.data
            let index = Math.floor(Math.random() * 10) + 1
            this.showAds = API[index].name 
          })
          .catch(err =>{
            console.log(err)
          })
        },
        null,
        true,
        "America/Los_Angeles"
      );
    },
    getAPI() {
      axios.get("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
      .then((data) =>{
        let API = data.data
        let index = Math.floor(Math.random() * 10) + 1
        this.showAPI = API[index].name 
        console.log(this.showAPI)
      })
      .catch(err =>{
        console.log(err)
      })
    }
  },
  watch : {
    showAds(val) {
      this.adsAPI = val 
    }
  },
  created () {
    this.cron()
  },
  mounted () {
    let token = localStorage.getItem('token')
    axios.get('/questions',{ headers : {token} })
    .then(({ data }) =>{
      this.questions = data
    })
    .catch(err =>{
      console.log(err.response)
    })
  }
  
}
</script>
