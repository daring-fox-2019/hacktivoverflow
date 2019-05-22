<template>
  <div class="container" style="margin-top:100px">
    <div class="row">
      <div class="col-9">
        <AskQuestion/>
        <div class="mt-3">
          <Question :question="question" v-for="(question, i) in allQuestions" :key="i"/>
        </div>
      </div>
      <div class="col-3">
        <WatchTags/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/database/axios'
import Question from "@/components/Question.vue";
import WatchTags from "@/components/WatchTag.vue";
import AskQuestion from "@/components/AskQuestion.vue";
import { mapState } from 'vuex';

export default {
  name: "home",
  components: {
    Question,
    WatchTags,
    AskQuestion
  },
  data() {
    return {
      listQuestion: []
    };
  },
  beforeMount() {
    this.$store.dispatch('getAllQuestions')
  },
  computed: {
    ...mapState(['allQuestions'])
  },
  methods: {
    
  }
};
</script>
