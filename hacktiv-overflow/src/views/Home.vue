<template>
<v-container >
  <v-layout align-start justify-center row fill-height>
    <div>
       <h3 class="display-2 font-weight-medium pa-2 ma-2">Hacktiv Overflow</h3>
    </div>
  </v-layout>
  <v-layout v-show="!isDetail">
    <v-flex xs12>
    <HacktivCard class="pa-2" v-on:get-detail="getDetail" v-for="(question, index) in questions" :question="question" :key="index"/>
    </v-flex>
  </v-layout>
  <v-layout>
    <v-flex xs12>
   <Detail v-on:backHome="backHome" v-show="isDetail" v-bind:detail="detail"/>
   </v-flex>
  </v-layout>
  </v-container>
</template>


<script>
import HacktivCard from '@/components/HacktivCard.vue'
import Detail from '@/views/Detail.vue'
import overflow from '@/api/overflow.js' 
  export default {
    components: {
      HacktivCard,
      Detail
    },
    data(){
      return {
        questions: [],
        detail: [],
        isDetail: false
      }
    },
    created(){
      this.fetchData()

    },
    methods : {
      fetchData(){
        overflow.get('/')
        .then(({data})=>{
          this.questions = []
          this.questions = data
        })
        .catch(err =>{
          console.log(err)
        })
      },
      getDetail(id, status){
        overflow.get(`/${id}`)
        .then(({data})=>{
          this.detail = []
          this.detail = data
          this.isDetail = true 
        })
        .catch(err =>{
          console.log(err)
        })

      },
      backHome(){
        this.isDetail = false

      }
    }
  }
</script>
