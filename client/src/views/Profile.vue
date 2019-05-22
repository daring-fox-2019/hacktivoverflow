<template>
  <v-container>
    <ListQuestions title="Your Questions" />
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
    this.$store.dispatch('getUserQuestions')
  }
};
</script>