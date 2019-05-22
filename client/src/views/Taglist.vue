<template>
  <section>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row>
            <h1 class="ml-4 display-1 font-weight-medium text-uppercase">ADD preferred discussion</h1>
          </v-layout>
          <v-layout row>
            <p
              class="ml-4 mt-2"
            >Here you can view and seacch tags from the whole website and you may add them to your watch by clicking on the tagname. Your added tags will be saved automatically to your account and you can then activate the 'Watch-tag' button in your browse page.</p>
          </v-layout>
          <v-layout row wrap class="mt-6">
            <v-text-field
              append-icon="mic"
              class="mx-3"
              v-model="searchInput"
              flat
              color="white"
              label="Search"
              prepend-inner-icon="search"
              solo-inverted
            ></v-text-field>
          </v-layout>
          <v-container fluid class="px-0">
            <!-- {{filtered}} -->
            <v-layout row wrap>
              <v-flex class="mx-4 my-1 ml-0" xs1 v-for="(tag, index) in filtered" :key="index">
                <v-chip @click="addTagToUser(tag._id)" small color="orange" text-color="white">
                  {{tag.name}}
                  <v-icon right>cake</v-icon>
                </v-chip>
                <!-- <v-avatar color="orange">
                  <span class="white--text headline">{{tag.name[0]}}</span>
                </v-avatar> -->
                <!-- <a
                  v-on:click.prevent="addTagToUser(tag._id)"
                  class="black--text caption"
                ></a> -->
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <!-- <v-flex xs6>
          <v-layout row>
            <h1 class="ml-4 display-1 font-weight-medium text-uppercase">Browse thread by tag</h1>
          </v-layout>
          <v-text-field
              append-icon="mic"
              class="mx-3"
              v-model="searchInput"
              flat
              color="white"
              label="Search"
              prepend-inner-icon="search"
              solo-inverted
            ></v-text-field>

        </v-flex> -->
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from 'vuex'

export default {
  data() {
    return {
      items: [],
      searchInput: ""
    };
  },
  created() {
    this.getTags();
  },
  methods: {
    getTags() {
      this.axios
        .get(`/tags`, { headers: { token: localStorage.getItem("token") } })
        .then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            this.items.push(data[i]);
          }
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: `${err.response}!`
          });
        });
    },
    addTagToUser(id) {
      console.log(id, "PAPAPAPAPAPPA");

      this.axios
        .post(
          "/tags/add",
          { tags: id },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          Swal.fire({
            type: "success",
            text: `Tag is added!`
          });
          this.$store.dispatch('getUser')
        })
        .catch(err => {
          console.log(err.response);

          Swal.fire({
            type: "error",
            text: `${err.response.data.message}!`
          });
        });
    }
  },
  computed: {
    filtered() {
      return this.items.filter(tg => {
        return tg.name.toLowerCase().match(this.searchInput.toLowerCase());
      });
    },
    ...mapState(["watchedTags"])
  },
  watch: {
    watchedTags() {
      this.$store.dispatch('getUser')
    }
  },

};
</script>

<style>
</style>
