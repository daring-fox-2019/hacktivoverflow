<template>
  <v-container>
    <h1>Create New Question</h1>
    <PostForm @submitted="submitQuestion"/>
  </v-container>
</template>
<script>
import PostForm from '@/components/PostForm';

export default {
  components: {
    PostForm
  },
  data(){
    return {
      
    }
  },
  methods: {
    submitQuestion(title, description){
      console.log('halo')
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
