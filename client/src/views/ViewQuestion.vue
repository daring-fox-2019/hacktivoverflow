<template>
  <v-container grid-list-xs>
    <h1>Question</h1>
    <Post :content="$store.state.question"/>
    <h1>Answer</h1>
    <Post v-for="answer in $store.state.answers" :content="answer" :key="answer._id"/>
    
  </v-container>
</template>
<script>
import Post from '@/components/Post'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  components: {
    Post
  },
  data(){
    return {
      editor: ClassicEditor,
      title: '',
      description: ''
    }
  },
  created(){
    this.$store.dispatch('getQuestion',this.$route.params.id)
  },
  methods: {

  }
}
</script>
