<template>
  <v-container>
    <h1>{{ $store.state.user.name }}</h1>
    <ListQuestions v-model="$store.state.user.questions" title="Questions" />
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
    if (!localStorage.getItem('token')) {
      this.$router.push("/auth");
    }
    this.$store.dispatch('getUserQuestions',this.$route.params.id)
  }
};
</script>