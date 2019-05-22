<template>
  <div>
    <div v-for="question in listQuestion" :key="question._id">
      <v-layout align-center justify-space-between fluid px-5 py-3>
        <v-flex md1>
          <v-flex>{{question.upvotes.length-question.downvotes.length}}</v-flex>
          <v-flex>votes</v-flex>
        </v-flex>
        <v-flex md1>
          <v-flex>{{question.answers.length}}</v-flex>
          <v-flex>answers</v-flex>
        </v-flex>
        <v-flex>
          <v-layout column pl-4>
            <v-flex align-self-start ><router-link :to="'/questions/'+question._id"
            style="text-decoration: none;">{{question.title}}</router-link></v-flex>
            <v-flex align-self-start>
              <Tags :tags="question.tags"/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider/>
    </div>
  </div>
</template>

<script>
import Tags from '@/components/Tags.vue';

export default {
  props: ['listQuestion'],
  components: {
    Tags,
  },
};
</script>
