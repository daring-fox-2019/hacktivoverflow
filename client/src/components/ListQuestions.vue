<template>
  <div>
    <h1>{{ title }}</h1>
    <v-layout row wrap>
      <v-list three-line>
        <Question v-for="(question,index) in $store.state.user.questions" v-model="$store.state.user.question[index]" :key="question._id"/>
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
  props: ["title"]
};
</script>
