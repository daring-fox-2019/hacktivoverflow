<template>
  <div>
    <h1>My Questions</h1>
    <v-layout>
      <v-flex>
        <cards class="ma-1" v-for="(item, index) in myQuestions" :key="index" :item="item"></cards>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import cards from "../components/cards.vue";

export default {
  components: {
    cards
  },
  data() {
    return {
      myQuestions: []
    };
  },
  methods: {
    fetchMy() {
      axios({
        method: "get",
        url: `http://localhost:3000/questions/my`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.myQuestions = []
          data.forEach(item => {
            item.createdAt = new Date(item.createdAt).toDateString();
          });
          this.myQuestions = data;
        })
        .catch(err => {
          err.origin = "question.vue - fetchmy";
          this.$emit("error", err);
        });
    }
  },
  created() {
    this.fetchMy();
  }
};
</script>
