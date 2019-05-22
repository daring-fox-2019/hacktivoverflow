<template>
  <v-list-tile>
    <v-layout justify-center column>
      <v-list-tile-action>
        <v-btn @click="voteQuestion('upvote')" icon>
          <v-icon color="grey">arrow_drop_up</v-icon>
        </v-btn>
      </v-list-tile-action>
      <span class="ml-2">{{ value.upvotes.length - value.downvotes.length }}</span>
      <v-list-tile-action>
        <v-btn @click="voteQuestion('downvote')" icon>
          <v-icon color="grey">arrow_drop_down</v-icon>
        </v-btn>
      </v-list-tile-action>
    </v-layout>
    <v-flex>
      <v-list-tile-content>
        <router-link :to="'/questions/'+value._id">
        <v-list-tile-title class="text-truncate">{{ value.title }}</v-list-tile-title>
        </router-link>
        <v-list-tile-sub-title>asked by : <router-link v-model="$store.state.user.name" to="/profile">{{ $store.state.user.name }}</router-link></v-list-tile-sub-title>
      </v-list-tile-content>
    </v-flex>

  </v-list-tile>
</template>
<script>
export default {
  name: 'question',
  props: ['value'],
  data() {
    return {};
  },
  methods: {
    voteQuestion(voteType){
      this.$store.dispatch('voteQuestion',{
        questionid: this.value._id,
        voteType
        })
    }
  }
};
</script>
