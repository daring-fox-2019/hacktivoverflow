<template>
  <v-card id="watch-tag" class="ml-3">
    <v-toolbar color="dark" style="justify-content:center;">
      <v-layout align-center justify-space-between fluid>
        <v-toolbar-title justify-center>
          <i class="fas fa-eye mr-3"></i>Watch tag
        </v-toolbar-title>

        <span @click="edit" v-if="!isEdit" style="cursor: pointer;">Edit</span>
        <span @click="batal" v-else style="cursor: pointer;">Cancel</span>
      </v-layout>
    </v-toolbar>
    <v-flex v-if="!isEdit" style="min-height:150px; padding-top:10px; max-width:">
      <Tags :tags="tags"/>
    </v-flex>
    <v-layout justify-center v-else mt-3>
      <v-flex md11 mb-3 style="min-height:120px; padding-top:10px;">
        <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>
        <v-btn color="primary" @click="addTag">Save</v-btn>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import Tags from "@/components/Tags.vue";
import VueTagsInput from "@johmun/vue-tags-input";

import axios from "axios";

export default {
  components: {
    Tags,
    VueTagsInput
  },
  data() {
    return {
      tags: [],
      tag: "",
      isEdit: false,
      userId: localStorage.userId
    };
  },
  created() {
    if (this.userId) {
      axios
        .get(`http://localhost:3000/user/${this.userId}`)
        .then(({ data }) => {
          this.tags = data.watchTag;
        });
    }
  },
  methods: {
    edit() {
      this.isEdit = true;
    },
    batal() {
      this.isEdit = false;
    },
    addTag() {
      let tag = [];
      this.tags.forEach(element => {
        tag.push(element.text);
      });

      let datas = {
        tags: tag
      };
      axios
        .patch(`http://localhost:3000/user/${localStorage.userId}`, datas)
        .then(({ data }) => {
          this.tags = data.watchTag;
          this.isEdit = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>
