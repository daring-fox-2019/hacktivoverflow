<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex mt-4 xs10 offset-xs5 offset-md2 offset-lg3>
        <AnswerCard v-for="(q, index) in listQuestions" :key="index" :listQuestions="listQuestions"></AnswerCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import AnswerCard from '@/components/AnswerCard.vue'
  export default {
    components : {AnswerCard},
    data: () => ({

    }),
    mounted() {
      this.$store.dispatch('getQuestions')
    },
  computed: {
    ...mapState(['listQuestions'])
    }
  }
</script>

<style scope>


</style>
