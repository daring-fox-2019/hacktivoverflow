<template>
  <v-list-tile>
    <v-layout justify-center column>
      <v-list-tile-action>
        <v-btn @click="vote('upvote')" icon>
          <v-icon color="grey">arrow_drop_up</v-icon>
        </v-btn>
      </v-list-tile-action>
      <span class="ml-2">{{ question.upvotes.length - question.downvotes.length }}</span>
      <v-list-tile-action>
        <v-btn @click="vote('downvote')" icon>
          <v-icon color="grey">arrow_drop_down</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-layout>
    <v-flex>
      <v-list-tile-content>
        <router-link :to="'/question/'+question._id">
        <v-list-tile-title class="text-truncate">{{ question.title }}</v-list-tile-title>
        </router-link>
        <v-list-tile-sub-title>asked by : <router-link class="mr-5" v-model="question.user" :to="'/profile/'+question.user._id">{{ question.user.name }}</router-link>
        <span class="grey--text mr-5">
        created : {{ createdAt }} 
        </span>
        <span class="grey--text">
         updated : {{ updatedAt }}
        </span>
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-flex>

  </v-list-tile>
</template>
<script>
export default {
  name: 'question',
  props: ['question'],
  data() {
    return {};
  },
  computed: {
    createdAt(){
      return new Date(this.question.createdAt).toLocaleDateString('id-ID')
    },
    updatedAt(){
      return new Date(this.question.updatedAt).toLocaleDateString('id-ID')
    },
  },
  methods: {
    vote(voteType){
      this.$store.dispatch('voteQuestion',{
        id: this.question._id,
        voteType
        })
    }
  }
};
</script>
