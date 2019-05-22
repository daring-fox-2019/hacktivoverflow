<template>
  <div class="p-2" style="background-color:#eeeeee">
    <div class="d-flex justify-content-center align-items-center">
      <p class="pt-2"> <i class="fas fa-eye"></i> watch tags</p>
    </div>
    <div style="background-color:white" class="p-2" v-if="!mode">
      <b-button
        size="sm"
        @click="updateTag(btag.text)"
        variant="secondary"
        class="m-1"
        v-for="(btag, i) in tags"
        :key="i"
      >
        {{ btag.text }}
        <i class="fas fa-times"></i>
      </b-button>
    </div>

    <div style="background-color:white" class="p-2" v-if="mode">
      <b-button
        size="sm"
        variant="secondary"
        class="m-1"
        v-for="(btag, i) in tags"
        :key="i"
        @click="searchTag(btag.text)"
      >{{ btag.text }}</b-button>

       <b-button
        size="sm"
        variant="outline-secondary"
        class="m-1"
        @click="searchTag()"
      >All</b-button>
    </div>
    <b-form-input list="my-list-id" v-model="inputTag" class="mt-2" size="sm" v-if="mode" placeholder="input tag here"></b-form-input>

    <datalist id="my-list-id">
      <option v-for="(tag,i) in optionsTag" :key="i">{{ tag }}</option>
    </datalist>
    <b-button variant="primary" size="sm" block class="mt-2" @click="updateTag" v-if="mode"> <i class="fas fa-plus"></i> add</b-button>
    <b-button variant="primary" size="sm" block class="mt-2" v-if="mode" @click="editMode"> <i class="fas fa-cog"></i> edit</b-button>
    <b-button variant="primary" size="sm" block class="mt-2" v-if="!mode" @click="editMode"> <i class="fas fa-clipboard-check"></i> done</b-button>
  </div>
</template>

<style scoped>
.btn-sm,
.btn-group-sm > .btn {
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  line-height: 1.5;
}
</style>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import axios from "@/database/axios";
import { mapState } from 'vuex';

export default {
  data() {
    return {
      tags: [],
      tag: "",
      inputTag: "",
      optionsTag: [],
      mode: true
    };
  },
  mounted() {
    this.getUserTags();
  },
  watch: {
    inputTag() {
      this.getSuggestTag();
    }
  },
  computed:{
    ...mapState(['isLogin'])
  },
  components: {
    VueTagsInput
  },
  methods: {
    getUserTags() {
      axios
        .get(`/users/${localStorage.getItem("id")}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          let newTags = [];
          data.tags.map(el => {
            newTags.push({ text: el, tiClasses: ["ti-valid"] });
          });
          this.tags = newTags;
        })
        .catch(err => {
          console.log(err);
        });
    },
    editMode() {
      this.mode = !this.mode;
    },
    updateTag(removetag) {
      if(this.isLogin){
        if (typeof removetag == "string" || this.optionsTag.length != 0) {
          if(typeof removetag != "string"){
            removetag = null
          }
          axios
            .patch(
              "/users",
              { tag: this.inputTag, removetag },
              { headers: { token: localStorage.getItem("token") } }
            )
            .then(({ data }) => {
              this.inputTag = "";

              let newTags = [];
              data.tags.map(el => {
                newTags.push({ text: el, tiClasses: ["ti-valid"] });
              });
              this.tags = newTags;
            })
            .catch(err => {
              this.$swal(":(", `${err.response.data.message}`, "error");
            });
        } else if (this.optionsTag.length == 0) {
          this.$swal(":(", `not valid tag, choose wisely`, "error");
        }
      } else {
        this.$swal(`Login First`,'', "info");
      }
    },
    getSuggestTag() {
      axios
        .get("/questions/tag", { params: { tag: this.inputTag } })
        .then(({ data }) => {
          this.optionsTag = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchTag(tag) {
      this.$store.dispatch('searchByTag', tag)
    }
  }
};
</script>

<style>
.vue-tags-input {
  background: #324652;
}
</style>

