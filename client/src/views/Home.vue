<template>
  <v-container grid-list-md text-xs-center fluid>
    <v-layout row wrap align-start justify-start>
      <v-switch v-model="switch1" id="switch" :label="`Watched : ${switch1.toString()}`"></v-switch>
      <div class="header">All Questions</div>
      <v-spacer></v-spacer>
      <div>
        <v-btn outline flat color="info" class="button" @click="getQuestion">Ask Question</v-btn>
      </div>
    </v-layout>
     <v-layout
      row
      wrap
      align-start
      justify-start
      v-for="(question, index) in filtered"
      :key="index"
      class="card-layout"
    >
    <QuestionCard :question="question" :filtered="filtered" :search="search"/>
     </v-layout>
  </v-container>
</template>

<script>
import QuestionCard from "../components/QuestionCard";
import { mapActions, mapState } from "vuex";
import axios from "axios";
const baseURL = "http://52.221.237.158";

export default {
  props: ["search"],
  data() {
    return {
      checkbox: true,
      radioGroup: 1,
      switch1: false,
      loggedUser: {}
    };
  },
  components: {
    QuestionCard
  },
  created() {
    this.$store.state.questions = [];
    this.getQuestions();
    this.getUser();
    console.log(this.questions);
  },
  watch: {
    switch1(val) {
      if (val) {
        this.getWatchedTags();
      } else {
        this.getQuestions();
      }
    }
  },
  computed: {
    ...mapState(["questions", "user"]),
    filtered() {
      return this.questions.filter(entry => {
        return entry.title.toLowerCase().match(this.search);
      });
    }
  },
  methods: {
    ...mapActions(["getQuestions", "getUser"]),
    getQuestion() {
      if (!localStorage.getItem("token")) {
        this.$router.push({ path: "/auth" });
        this.$swal("Ooops", "please login to continue", "warning");
      } else {
        this.$router.push({ path: "/questions" });
      }
    },
    getWatchedTags() {
      axios
        .get(`${baseURL}/questions/preferred-discussions`, {
          headers: {
            token: localStorage.getItem("token")
          },
          params: {
            watched: this.switch1
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.$store.commit("setQuestions", data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>

.button:hover {
  color: orange !important;
}

.header {
  font-family: 'Puritan', sans-serif;
  font-size: 36px;
}
.card-layout {
  border-bottom: 1px solid #eeeeee;
}

.card-layout:hover {
  background-color: #eeeeee;
}
</style>
