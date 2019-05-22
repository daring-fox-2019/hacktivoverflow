<template>
  <div>
    <h1>Answer</h1>
    <v-layout>
      <v-flex>
        <cards class="ma-1" v-for="(item, index) in myAnswers" :key="index" :item="item" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import cards from '../components/cards.vue'

export default {
  data() {
    return {
      myAnswers: []
    }
  },
  components: {
    cards
  },
  methods: {
    fetchMy() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/answers/my',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.myAnswers = []
          data.forEach(item => {
            item.createdAt = new Date(item.createdAt).toDateString()
          });
          this.myAnswers = data
        })
    },
  },
  created() {
    this.fetchMy()
  }
};
</script>
