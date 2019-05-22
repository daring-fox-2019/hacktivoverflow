<template>
  <div>
    <v-layout column align-start>
      <h2>Tags</h2>
      <span style="text-align: left">A tag is a keyword or label that categorizes your question with other, 
        similar questions. Using the right tags makes it easier for others to 
        find and answer your question.</span>
      <v-text-field name="tag" v-model="searchTag" label="Search tag" type="text"></v-text-field>
    </v-layout>
    <v-layout wrap>
      <v-flex xs2 v-for="tag in filterListTag" :key="tag._id" ma-3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                <v-chip label>{{tag.name}}</v-chip>
              </h3>
              <div>x {{ tag.count }}</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      listTag: [],
      filterListTag: [],
      searchTag: ""
    };
  },
  watch: {
    searchTag(val) {
      this.filterListTag = this.listTag.filter(el => {
        if (el.name.toLowerCase().match(new RegExp(val.toLowerCase()))) {
          return el;
        }
      });
    }
  },
  created() {
    axios
      .get("http://35.198.235.228/tag")
      .then(({ data }) => {
        this.listTag = data;
        this.filterListTag = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

