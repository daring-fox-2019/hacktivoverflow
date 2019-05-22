<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row>
      <h1 class="ml-4 display-2 font-weight-medium text-uppercase">dashboard</h1>
    </v-layout>
    <v-layout row>
      <h3 class="ml-4">List of questions you've asked :</h3>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <QuestionCard
          v-for="(q, index) in myQuestionsList"
          :q="q"
          :key="index"
        ></QuestionCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import QuestionCard from "@/components/QuestionCard.vue";
import Swal from "sweetalert2";

export default {
  components: { QuestionCard },
  data: () => ({}),
  created() {
    this.getAnswersOnThisQuestion();

    // console.log('haaaa',this.$store.state.myQuestionsList);
  },
  mounted() {
    this.$store.dispatch("getMyQuestions");
  },
  methods: {
  ...mapActions(["getDetailsOnThisQuestion", "getListAnswersOnThisQuestion"]),
    call(id) {
      console.log('him',id );
      
      this.$store.dispatch(
        "getListAnswersOnThisQuestion",
        id
      );
    },
    showMyEditForm() {
      this.$router.push(`/edit-question/${id}`);
    }
  },
  computed: {
    ...mapState([
      "oneQuestionDetails",
      "answersOnThisQuestion",
      "myQuestionsList"
    ])
  }
};
</script>

<style scope>
</style>
