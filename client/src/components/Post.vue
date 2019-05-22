<template>
  <v-card>
    <v-layout v-show="!editing" row wrap>
      <v-layout align-center justify-center column xs1>
        <v-btn icon>
          <v-icon color="grey">arrow_drop_up</v-icon>
        </v-btn>
        <span>{{ value.upvotes.length - value.downvotes.length }}</span>
        <v-btn icon>
          <v-icon color="grey">arrow_drop_down</v-icon>
        </v-btn>
      </v-layout>
      <v-flex xs10>
        <v-card-title primary-title class="display-1 font-weight-black">{{ value.title }}</v-card-title>
        <v-card-text v-html="value.description" class="subheading">{{ value.description }}</v-card-text>
        
      </v-flex>
      <v-layout justify-end xs1>
        <v-btn v-show="owner" @click="editing = !editing" color="success" icon>
          <v-icon color="white">border_color</v-icon>
        </v-btn>
      </v-layout>
    </v-layout>
    <PostForm v-show="editing"/>
  </v-card>
</template>
<script>
import PostForm from "@/components/PostForm";

export default {
  components: {
    PostForm
  },
  data(){
    return {
      editing: false
    }
  },
  props: ["value"],
  methods: {
    owner(){
      return this.value.user === localStorage.getItem('userId')
    },
    voteQuestion(voteType){
      this.$store.dispatch('voteQuestion',{
        questionid: this.value._id,
        voteType
        })
    },
    voteAnswer(voteType){
      this.$store.dispatch('voteAnswer',{
        answerid: this.value._id,
        voteType
        })
      },
  }
  // computed: {
  //   votes(){
  //     console.log(this.value)
  //     return this.value.upvotes.length - this.value.downvotes.length
  //   }
  // }
};
</script>
