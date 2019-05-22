<template>
  <div>
    <h1>Saved Tags</h1>
    <v-layout>
      <v-flex>
        <!-- <cards class="ma-1" v-for="(item, index) in questions" :key="index" :item="item"></cards> -->
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import cards from '../components/cards.vue'

export default {
  components: {
    cards
  },
  data() {
    return {
      
    }
  },
  methods: {
    fetchQuery() {
      
    }
  }
};
</script>
