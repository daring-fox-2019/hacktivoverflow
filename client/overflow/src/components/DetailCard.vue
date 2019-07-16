<template>
  <div class="container-fluid">
          <div class="row">
            <div class="col col-md-2">
              <b-button size="sm" style="width: 40px" variant="outline-success" @click.prevent='vote("upvote")' v-if='!content.upvotes.includes(this.$store.state.user._id)'>
                <i class="fas fa-chevron-up" style="font-size:20px;"></i>
              </b-button>
               <b-button size="sm" style="width: 40px" variant="success" @click.prevent='vote("upvote")' v-if='content.upvotes.includes(this.$store.state.user._id)'>
                <i class="fas fa-chevron-up" style="font-size:20px;"></i>
              </b-button>
              <h4 class="mb-0">{{ content.upvotes.length - content.downvotes.length }}</h4>
              <b-button size="sm" style="width: 40px" variant="outline-danger" @click.prevent='vote("downvote")' v-if='!content.downvotes.includes(this.$store.state.user._id)' >
                <i class="fas fa-chevron-down" style="font-size:20px;"></i>
              </b-button>
               <b-button size="sm" style="width: 40px" variant="danger" @click.prevent='vote("downvote")' v-if='content.downvotes.includes(this.$store.state.user._id)' >
                <i class="fas fa-chevron-down" style="font-size:20px;"></i>
              </b-button>
            </div>
            <div class="col col-md-9">
              <p v-html="content.content" class="text-left"></p>
            </div>
            <div class='col col-md-1'>
              <slot/>
            </div>
          </div>
        </div>
</template>

<script>
import axios from '@/api/server/axios.js'

export default {
  name: 'DetailCard',
  props: ['content'],
  data(){
    return {
      downvoted : content.downvotes.includes(this.$store.state.user._id),
      upvoted: content.upvotes.includes(this.$store.state.user._id)
    }
  },
  methods:{
    vote(type){
      if (!this.$store.state.isLogin){
        this.$router.push('/login')
      }else if(type === 'upvote'){
        if (!this.content.title){
          axios
            .patch(`/answers/vote/${this.content._id}`, {
              type: 'upvote'
            },{
              headers: {
                token: localStorage.token
              }
            })
            .then(({ data })=>{
              if(data.result === 'push upvote'){
                if (this.content.downvotes.includes(this.$store.state.user._id)){
                  let index = this.content.downvotes.indexOf(this.$store.state.user._id)
                  this.content.downvotes.splice(index,1)
                }
                this.content.upvotes.push(this.$store.state.user._id)
              }else if (data.result === 'remove upvote'){
                let index = this.content.upvotes.indexOf(this.$store.state.user._id)
                this.content.upvotes.splice(index,1)
              }
            })
            .catch(err=>{
              console.log(err)
            })
        }else if(this.content.title){
           axios
            .patch(`/questions/vote/${this.content._id}`, {
              type: 'upvote'
            },{
              headers: {
                token: localStorage.token
              }
            })
            .then(({ data })=>{
              if(data.result === 'push upvote'){
                if (this.content.downvotes.includes(this.$store.state.user._id)){
                  let index = this.content.downvotes.indexOf(this.$store.state.user._id)
                  this.content.downvotes.splice(index,1)
                }
                this.content.upvotes.push(this.$store.state.user._id)
              }else if (data.result === 'remove upvote'){
                let index = this.content.upvotes.indexOf(this.$store.state.user._id)
                this.content.upvotes.splice(index,1)
              }
            })
            .catch(err=>{
              console.log(err)
            })
        }
      }else{
        if (!this.content.title){
          axios
            .patch(`/answers/vote/${this.content._id}`, {
              type: 'downvote'
            },{
              headers: {
                token: localStorage.token
              }
            })
            .then(({ data })=>{
              if(data.result === 'push downvote'){
                if(this.content.upvotes.includes(this.$store.state.user._id)){
                  let index = this.content.upvotes.indexOf(this.$store.state.user._id)
                  this.content.upvotes.splice(index,1)
                }
                this.content.downvotes.push(this.$store.state.user._id)
              }else if (data.result === 'remove downvote'){
                let index = this.content.downvotes.indexOf(this.$store.state.user._id)
                this.content.downvotes.splice(index,1)
              }
            })
            .catch(err=>{
              console.log(err)
            })
        }else if(this.content.title){
            axios
            .patch(`/questions/vote/${this.content._id}`, {
              type: 'downvote'
            },{
              headers: {
                token: localStorage.token
              }
            })
            .then(({ data })=>{
              if(data.result === 'push downvote'){
                if(this.content.upvotes.includes(this.$store.state.user._id)){
                  let index = this.content.upvotes.indexOf(this.$store.state.user._id)
                  this.content.upvotes.splice(index,1)
                }
                this.content.downvotes.push(this.$store.state.user._id)
              }else if (data.result === 'remove downvote'){
                let index = this.content.downvotes.indexOf(this.$store.state.user._id)
                this.content.downvotes.splice(index,1)
              }
            })
            .catch(err=>{
              console.log(err)
            })
        }
      }
    }
  },

}
</script>

