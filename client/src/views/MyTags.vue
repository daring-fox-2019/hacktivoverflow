<template>
  <v-container>
    <h1>Tags</h1>
    <h6
      class="caption my-3"
    >A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</h6>
    <v-layout row wrap>
      <v-text-field
        append-icon="mic"
        class="mx-3"
        flat
        label="Search by Tag"
        prepend-inner-icon="search"
        solo-inverted
        v-model="search"
      ></v-text-field>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs1 v-for="(tag, index) in filtered" :key="index" class="text-xs-center">
        <v-avatar color="teal" class="mb-1">
          <span class="white--text headline text-uppercase">{{tag.tagName[0]}}</span>
        </v-avatar>
        <a
          @click.prevent="addTags(tag._id)"
          href="#"
          style="text-decoration: none; color: black"
        >{{tag.tagName}}</a>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
const baseURL = "http://localhost:3000";

export default {
  data() {
    return {
      tags: [],
      search: ""
    };
  },
  methods: {
    addTags(id) {
      axios
        .post(
          `${baseURL}/tags/addTag`,
          { tag: id },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          this.$store.dispatch("getTags")
          this.$swal('Yeap!', data.message,'success')
        })
        .catch(err => {
          this.$swal("Oops", err.response.data.message, "warning");
          console.log(err);
        });
    }
  },
  computed: {
    filtered() {
      return this.tags.filter(entry => {
        return entry.tagName.toLowerCase().match(this.search);
      });
    }
  },
  created() {
    axios
      .get(`${baseURL}/tags`, {
        headers: { token: localStorage.getItem("token") }
      })
      .then(({ data }) => {
        this.tags = data;
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>
