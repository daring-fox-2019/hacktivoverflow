<template>
  <div>
    <v-layout>
      <v-flex style="display: flex;" justify-space-between>
        <h1>Home</h1>
        <v-btn to="/newQuestion">Ask Something</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <cards class="ma-1" v-for="(item, index) in questions" :key="index" :item="item"></cards>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld'
import cards from '../components/cards.vue'

export default {
  components: {
    // HelloWorld
    cards
  },
  props: ["questions"],
  methods: {
  },
  created() {
    this.$emit('update-questions')
  }
};
</script>
