<template>
  <v-layout row>
    <v-layout column class="questions">
      <v-flex xs6 sm2 md2 lg2>
        <span class="headline">Search by tag: &nbsp;</span>
        <span class="display-1">{{ $route.params.tag }}</span>
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
      console.log('old..', oldv);
      console.log('new tag ...', newv);
      this.getQuestionsByTag(newv.params.tag);
    }
  },
  methods: {
    getQuestionsByTag(tag) {
      if(!tag) {
        tag = this.$route.params.tag
      }
      http
        .get("/questions/tagged/" + tag.toLowerCase())
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
