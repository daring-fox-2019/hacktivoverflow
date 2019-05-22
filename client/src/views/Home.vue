<template>
  <div class="home container-fluid">
    <QuestionBrief  v-for='question in questions' :key='question.id' :question='question' />
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionBrief from "../components/QuestionBrief";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    QuestionBrief
  },
  computed: mapState(["questions"]),
  mounted(){
    this.$store.dispatch('homeQuestions')
  } 
};
</script>
