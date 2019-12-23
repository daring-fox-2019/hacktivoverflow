<template>
  <v-container>
    <ListQuestions v-model="$store.state.queries" title="Search result" />
  </v-container>
</template>

<script>
import ListQuestions from "@/components/ListQuestions.vue";

export default {
  name: "profile",
  components: {
    ListQuestions
  },
  created() {
    // if (!this.$store.state.loggedIn) {
    //   this.$router.push("/auth");
    // }
  }
};
</script>