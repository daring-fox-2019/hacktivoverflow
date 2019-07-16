<template>
  <div class='container'>
    <div class='row d-flex justify-content-center pt-5 pb-3'>
      <h1>What have you got?</h1>
    </div>
    <div class="row d-flex justify-content-center">
     <b-form-group
      label='Title'
      label-for='question'     
     >
      <b-form-input 
        id='question'
        placeholder='Enter title'
        v-model='title'
        style="width: 500px"
      ></b-form-input>
     </b-form-group>
    </div>
    <h5 class='pt-3'>Content</h5>
    <div class='row d-flex justify-content-center'>
      <wysiwyg v-model="questionForm"/>
    </div>
    <div class='row d-flex justify-content-center pt-3'>
      <b-button variant='primary' style="width: 150px" size='lg' @click.prevent='postQuestion'>Post!</b-button>
    </div>
    <div class='mt-3'>
    <router-link to="/" >
        <small>Nevermind!</small>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from '@/api/server/axios.js'
export default {
  data(){
    return {
      questionForm: '',
      title: ''
    }
  },
  methods: {
    postQuestion(){
      if(this.title.length > 0 && this.questionForm.length > 0){
        axios.post('/questions',{
        title: this.title,
        content: this.questionForm
      },
      {
        headers: {
          token: localStorage.token
        }
      })
        .then(({data})=>{
          this.$swal("Success!", "You have posted a question", "success")
          this.$router.push({path: `/questions/${data._id}`})
        })
        .catch(err=>{
          console.log(err)
        })
      }else{
        this.$swal('Invalid input', 'You have not written any content of your question!', 'info')
      }
    }
  }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>


