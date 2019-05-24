<template>
  <div>
    <h1>{{ title }}</h1>
    <v-layout row wrap>
      <v-list three-line>
        <Question v-for="question in value" :question="question" :key="question._id"/>
        <!-- <v-divider inset></v-divider> -->
        
      </v-list>
    </v-layout>
  </div>
</template>
<script>
import Question from "@/components/Question.vue";
export default {
  name: 'listquestions',
  components: {
    Question
  },
  props: ["title",'value'],
  created(){
    this.value
  }
};
</script>
