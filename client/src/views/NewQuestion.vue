<template>
  <v-container>
    <PostForm @submitted="submitQuestion"/>
  </v-container>
</template>
<script>
import PostForm from '@/components/PostForm';

export default {
  data(){
    return {
      
    }
  },
  methods: {
    submitQuestion(title, description){
      this.$store.dispatch('createQuestion',{
        title, description
      })
      
      // this.title = '',
      // this.description = ''
    }
  },
  created(){
    if (!localStorage.getItem('token')) {
      this.$router.push("/auth");
    }
  }
}
</script>
