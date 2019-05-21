<template>
  <div class="home">
          <v-layout align-center justify-space-between fluid px-5 py-3>
            <h2>My Questions</h2>
            <v-btn color="blue" to="/addQuestion">Ask Question</v-btn>
          </v-layout>
          <v-divider/>

      <v-layout fluid mt-3>
        <v-flex>
          <!-- LISTQUESTION -->
          <Question :list-question="this.$store.state.myQuestion"/>
        </v-flex>

        <v-flex xs3>
          <v-layout fluid justify-center>
            <v-card id="watch-tag">
              <v-toolbar color="dark" style="justify-content:center;">
                <v-toolbar-title>Watch tag</v-toolbar-title>
              </v-toolbar>
              <v-card-text>tes</v-card-text>
            </v-card>
          </v-layout>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from '@/components/Question.vue';

export default {
  name: 'home',
  components: {
    Question,
  },
  created() {
    this.$store.dispatch('loadMyQuestion');
  },
};
</script>

<style scoped>
#watch-tag {
  width: 90%;
  border-radius: 5px;
}

.container {
  margin: 0;
}
</style>
