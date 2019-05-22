<template>
  <b-container fluid class>
    <b-row class="border-bottom" v-if="answer">
      <!-- left side - vote -->
      <b-col cols="1" class="pr-0 text-center mt-3">
        <div>
          <a href="#" @click.prevent="upvoteAnswer(answer)">
            <i class="fas fa-caret-up fa-2x"></i>
            </a>
        </div>
        <div>{{totalLike}}</div>
        <div>
          <a href="#" @click.prevent="downvoteAnswer(answer)"><i class="fas fa-caret-down fa-2x"></i></a>
        </div>

      <!-- right side -->
      </b-col>
      <b-col cols="11" class="pr-0 mt-3">
        <div v-html="answer.answer ||'explanation here'"></div>


        <!-- edit answer and user -->
        <div class="row justify-content-between"
          style="font-size:12px; color:grey;">
          <div class="pl-3 mt-3">
            <router-link :to="'/answers/edit/' + answer._id">Edit answer</router-link>
          </div>
          <div
            class="d-flex justify-content-end px-3  align-items-end"
            >
          answered {{ answer.createdAt | moment("from")}}, by {{ answer.user.name ||'User info'}}
        </div>
        </div>
        <!-- comment stars here -->
        <!-- <div>{{'Comments here'}}</div>
        <div class="border-top p-1"
          v-for="(test, index) in 5"
          :key="index"
          style="font-size:12px;">
          test
        </div> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Tag from '@/components/Tag.vue';

export default {
  props: ['answer'],
  name: 'detail-answer',
  data() {
    return {};
  },
  components: {
    Tag,
  },
  computed: {
    totalLike() {
      return Number(this.answer.upvotes.length) - Number(this.answer.downvotes.length);
    },
  },
  methods: {
    upvoteAnswer(id) {
      console.log(id, '-----');
      this.$store.dispatch('upvoteAnswer', id);
    },
    downvoteAnswer(id) {
      console.log(id);
      this.$store.dispatch('downvoteAnswer', id);
    },
  },
};
</script>

<style>
</style>
