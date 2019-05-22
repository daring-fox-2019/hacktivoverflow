<template>
  <div>
    <div class="mb-3">
      <span class="title ml-3 mr-5 grey--text text--darken-3">
        Recent
        <span class="font-weight-light accent--text">Questions</span>
      </span>
    </div>
    <div v-for="question in questions" :key="question.id">
      <v-card class="mx-auto" color="grey darken-3 mb-4" dark flat>
        <v-card-title>
          <v-icon large left>mdi-twitter</v-icon>
          <span class="title font-weight-light">{{formatTime(question.createdAt)}}</span>
        </v-card-title>
        <router-link
          :to="'questions/' + question._id"
          class="white--text"
          style="text-decoration: none"
        >
          <v-card-text class="headline font-weight-bold">"{{question.title}}"</v-card-text>
        </router-link>
        <v-card-actions>
          <v-list-tile class="grow">
            <v-list-tile-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{question.author.name}}</v-list-tile-title>
            </v-list-tile-content>
            <v-layout align-center justify-end>
              <div class="pr-5">
                <v-chip v-if="!question.solved">unsolved</v-chip>
                <v-chip class="accent" v-if="question.solved">solved</v-chip>
              </div>
              <div class="pr-5">
                <router-link
                  class="white--text"
                  style="text-decoration: none"
                  :to="'/questions/' + question._id"
                >{{question.answers.length}} answers</router-link>
              </div>
              <div :class="question.contribution">
                <span class="subheading mr-2">
                  <v-btn flat icon @click="$store.dispatch('upvoteQuestion', question._id)">
                    <v-icon class="upv">arrow_upward</v-icon>
                  </v-btn>
                  {{question.upvotes.length}}
                </span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1">mdi-share-variant</v-icon>
                <span class="subheading">
                  <v-btn
                    class="dwv"
                    flat
                    icon
                    @click="$store.dispatch('downvoteQuestion', question._id)"
                  >
                    <v-icon class="dwv">arrow_downward</v-icon>
                  </v-btn>
                  {{question.downvotes.length}}
                </span>
              </div>
            </v-layout>
          </v-list-tile>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  methods: {
    formatTime(time) {
      let formatted = moment(time).format();
      return moment(formatted)
        .startOf("hour")
        .fromNow();
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    }
  }
};
</script>

<style>
.upvote .upv {
  color: #ff9100 !important;
}
.upvote .dwv {
  color: #9e9e9e !important;
}

.downvote .upv {
  color: #9e9e9e !important;
}
.downvote .dwv {
  color: #ff9100 !important;
}

.v-icon {
  color: grey;
}
</style>