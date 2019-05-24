<template>
  <v-card>
    <v-layout v-show="!editing" row wrap>
      <v-layout align-center justify-center column xs1>
        <v-btn @click="vote('upvote')" icon>
          <v-icon color="grey">arrow_drop_up</v-icon>
        </v-btn>
        <span>{{ value.upvotes.length - value.downvotes.length }}</span>
        <v-btn @click="vote('downvote')" icon>
          <v-icon color="grey">arrow_drop_down</v-icon>
        </v-btn>
      </v-layout>
      <v-flex class="mb-3" xs10>
        <v-card-title primary-title class="display-1 font-weight-black">{{ value.title }}</v-card-title>
        <v-card-text v-html="value.description" class="subheading">{{ value.description }}</v-card-text>
        <v-card-sub-title>
          {{ purpose }} by :
          <router-link class="mr-5" v-model="value.user.name" to="/profile">{{ value.user.name }}</router-link>
        </v-card-sub-title>
        <span class="grey--text mr-5">created : {{ createdAt }}</span>
        <span class="grey--text">updated : {{ updatedAt }}</span>
      </v-flex>
      <v-layout v-show="owner" justify-end xs1>
        <v-btn @click="editing = !editing" color="success" icon>
          <v-icon color="white">border_color</v-icon>
        </v-btn>
      </v-layout>
    </v-layout>
    <v-container v-show="editing">
      <PostForm @submitted="update" :value="value">
        <v-btn @click="editing = !editing" color="info" dark class="mt-4">Cancel</v-btn>
      </PostForm>
    </v-container>
  </v-card>
</template>
<script>
import PostForm from "@/components/PostForm";

export default {
  components: {
    PostForm
  },
  data() {
    return {
      editing: false,
      owner: this.checkOwnership()
    };
  },
  props: ["tipe", "value"],
  computed: {
    purpose() {
      if (this.tipe == "Answer") return "answered";
      else return "asked";
    },
    createdAt() {
      return new Date(this.value.createdAt).toLocaleDateString("id-ID");
    },
    updatedAt() {
      return new Date(this.value.updatedAt).toLocaleDateString("id-ID");
    }
  },
  methods: {
    checkOwnership() {
      //5ce79c3d5f075c1b0b57d288
      
      return this.value.user._id === localStorage.getItem("userId");
    },
    vote(voteType) {
      let payload = {
        id: this.value._id,
        voteType
      };
      if (this.tipe == "Answer") payload.questionid = this.value.question;
      else payload.questionid = this.value._id;
      this.$store.dispatch("vote" + this.tipe, payload);
    },
    update(title, description) {
      this.editing = false;
      let payload = {
        id: this.value._id,
        title,
        description
      };
      if (this.tipe == "Answer") payload.questionid = this.value.question;
      else payload.questionid = this.value._id;
      this.$store.dispatch("update" + this.tipe, payload);
    }
  },
  created(){
    console.log(this.owner())
  }
  // computed: {
  //   votes(){
  //     console.log(this.value)
  //     return this.value.upvotes.length - this.value.downvotes.length
  //   }
  // }
};
</script>
