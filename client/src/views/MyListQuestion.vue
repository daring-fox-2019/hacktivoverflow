<template>
  <div v-if="!questions.length">
    <img src="../../public/undraw_no_data_qbuo.svg" alt srcset style="max-width: 100%;">
  </div>
  <v-container grid-list-md text-xs-center fluid v-else>
    <v-layout row wrap align-start justify-start>
      <div class="display-1 font-weight-light">My Questions Lists</div>
      <v-spacer></v-spacer>
      <div>
        <v-btn color="info" @click="getQuestion">Ask Question</v-btn>
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
      <QuestionCard
        v-on:get-edit="editQuestion"
        v-on:get-delete="deleteQuestion"
        :filtered="filtered"
        :search="search"
        :question="question"
      >
        <v-btn color="info" @click.prevent="editQuestion(question._id)">Edit</v-btn>
        <v-btn color="info" @click.prevent="deleteQuestion(question._id)">Delete</v-btn>
      </QuestionCard>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
import QuestionCard from "@/components/QuestionCard";
const baseURL = "http://52.221.237.158";
export default {
  props: ["search",],
  components: {
    QuestionCard
  },
  created() {
    this.$store.state.questions = [];
    this.getQuestions(localStorage.getItem("id"));
  },
  computed: {
    ...mapState(["questions"]),
    filtered() {
      return this.questions.filter(entry => {
        return entry.title.toLowerCase().match(this.search);
      });
    }
  },
  methods: {
    ...mapActions(["getQuestions"]),
    deleteQuestion(id) {
      axios
        .delete(`${baseURL}/questions/${id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.$swal("Yeap", data.message, "success");
          this.getQuestions(localStorage.getItem("id"));
        })
        .catch(err => {
          console.log(err);
        });
    },
    editQuestion(id) {
      this.$router.push(`/questions/edit/${id}`);
      this.$store.commit("setEdit", true);
    },
    getQuestion() {
      if (!localStorage.getItem("token")) {
        this.$router.push({ path: "/auth" });
        this.$swal("Ooops", "please login to continue", "warning");
      } else {
        this.$router.push({ path: "/questions" });
      }
    }
  }
};
</script>

<style scoped>
.card-layout {
  border-bottom: 1px solid #eeeeee;
}

.card-layout:hover {
  background-color: #eeeeee;
}

image.center {
  position: absolute;
  z-index: 0;
}

.white--text {
  width: 112px;
}
</style>


