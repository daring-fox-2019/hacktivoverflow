<template>
  <v-container>
    <ListQuestions title="coy" />
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
  }
};
</script>