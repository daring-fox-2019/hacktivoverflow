<template>
  <v-container>
    <v-flex xs12 sm6 d-flex>
      <v-select v-model="selected" :items="category" solo></v-select>
    </v-flex>
    <h1>{{}}</h1>
    <ListQuestions v-for="cat in category" v-show="selected==cat" :title="cat"/>
  </v-container>
</template>

<script>
import ListQuestions from "@/components/ListQuestions";

export default {
  components: {
    ListQuestions
  },
  data(){
    return {
      selected: 'Newest',
      category: ['Updated Recently','Newest','Most Voted','Most Answers']
    }
  },
  created() {
    this.$store.dispatch('getAllQuestions')
  },
  methods: {
  }
};
</script>
