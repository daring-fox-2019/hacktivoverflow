<template>
  <div class="container" style="background-color: white; color: rgb(139, 24, 8);">
    <v-layout row wrap id="top-row">
      <div>
        <h1>{{ title }}</h1>
      </div>
      <div>
        <v-btn color="info" large to="questions/add" style="margin-right: 0;">
          <i class="fas fa-plus mr-2"></i> Ask Question
        </v-btn>
      </div>
    </v-layout>
    <v-form @submit.prevent="tagFormSubmit">
      <v-layout row wrap style="display: flex; align-items: center; flex-direction: column;">
        <v-flex xs8>
          <v-text-field
            class="mt-2"
            v-model="tag"
            label="Tag"
            prepend-inner-icon="fas fa-tags"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-btn color="success" small style="margin-right: 0;" type="submit">
            <i class="fas fa-plus mr-2"></i> Add Tag
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
    <v-layout row wrap>
      <v-flex
        lg3
        md4
        sm6
        xs12
        style="display:flex; justify-content: center; padding: 1rem;"
        v-for="(tag, index) in tags"
        :key="index"
      >
        <div class="text-xs-center">
          <v-chip close style="background-color: #00BFA5; color: white; font-weight: bold;">
            <span style="cursor: pointer;" @click.prevent="changeKeyword(tag)">{{ tag }}</span>
          </v-chip>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "@/api/axios";
import { mapState } from "vuex";

export default {
  props: ["title"],
  data() {
    return {
      tag: "",
      tags: [],
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      axios({
        method: "GET",
        url: `/user`,
        headers: { token: localStorage.token },
      })
        .then(({ data }) => {
          console.log(data);

          this.tags = data.tags;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tagFormSubmit() {
      console.log(this.tag);

      axios({
        method: "POST",
        url: `/user`,
        data: { tag: this.tag },
        headers: { token: localStorage.token },
      })
        .then(({ data }) => {
          console.log(data);
          this.tag = "";
          this.getUser();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeKeyword(value) {
      console.log(value)
      this.$router.push("/foxoverflow");
      this.$store.commit("updateKeyword", value);
      this.$store.commit("setCurrentPage", "FoxOverflow")
      localStorage.currentPage = "FoxOverflow";
    }
  }
};
</script>

<style>
</style>
