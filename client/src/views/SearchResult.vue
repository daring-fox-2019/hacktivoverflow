<template>
  <v-layout row>
    <v-layout column class="questions">
      <v-flex xs6 sm2 md2 lg2>
        <span class="headline">Search: &nbsp;</span>
        <span class="display-1">{{ $route.params.key }}</span>
      </v-flex>
      <QuestionsList></QuestionsList>
    </v-layout>
    <!-- <WatchedTags v-if="$store.state.isLogin" class="watchedPanel"></WatchedTags> -->
  </v-layout>
</template>
<script>
import http from "@/api/http";
import QuestionsList from "@/components/QuestionsList";

export default {
  components: {
    QuestionsList
  },
  mounted() {
    this.getQuestionsByTag();
  },
  watch: {
    $route(newv, oldv) {
      let tag = newv;
      this.searchQuestions(newv.params.key);
    }
  },
  methods: {
    searchQuestions(key) {
      if(!key) {
        key = this.$route.params.key
      }
      http
        .get("/questions/search/" + key.toLowerCase())
        .then(({ data }) => {
          this.$store.commit("setQuestions", data);
        })
        .catch(err => {
          console.log(err);
          if (err.response) {
            err = err.response.data;
          }
          swal.fire("Error", err.toString(), "error");
        });
    }
  }
};
</script>
<style scoped>
.questions {
    max-width: 700px;
    width: 80%;
}
</style>
