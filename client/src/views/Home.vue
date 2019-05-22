<template>
  <v-container>
    <v-flex xs12 sm6 d-flex>
      <v-select v-model="selected" :items="category" :value="category[0]" solo></v-select>
    </v-flex>
    <ListQuestions v-show="selected=='Newest'" title="Newest"/>
    <ListQuestions v-show="selected=='Most Voted'" title="Most Voted"/>
    <ListQuestions v-show="selected=='Most Answers'" title="Most Answers"/>
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
      category: ['Newest','Most Voted','Most Answers']
    }
  },
  created() {
    
  },
  methods: {
  }
};
</script>
