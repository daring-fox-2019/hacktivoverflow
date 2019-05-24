<template>
  <v-container>
    <v-flex xs12 sm6 d-flex>
      <v-select v-model="selected" @change="sortQuestions" :items="category" solo></v-select>
    </v-flex>
    <ListQuestions v-model="$store.state.questions" v-for="cat in category" v-show="selected==cat" :title="cat" :key="cat"/>
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
    this.$store.dispatch('getAllQuestions',this.selected)
  },
  methods: {
    sortQuestions(){
      this.$store.commit('sortQuestions',this.selected)
    }
  }
};
</script>
