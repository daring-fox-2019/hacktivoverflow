<template>
  <b-container fluid>
    <b-row class="mt-3">
      <b-col class="px-0">Watched Tags:</b-col>
    </b-row>
    <b-row>
      <b-col class="px-0">
        <div class="border p-1 px-2" v-show="!onEdit"
        style="min-height: 40px;">
          <Tag v-for="(item, index) in showTag"
            :key="index"
            :tag="item.text"
            />
        </div>
        <div class="d-flex justify-content-end">
          <b-button 
            size="sm" 
            class="py-0 mt-2" 
            variant="outline-primary"
            @click.prevent="editTag"
            v-show="!onEdit">Edit</b-button>
        </div>
            
        <div>
          <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
            v-show="onEdit"
            style="max-width:none; width:100%;"
          />
        </div>
        
        <div class="mt-2 d-flex justify-content-end">
          <b-button 
            size="sm" 
            class="py-0 " 
            variant="outline-primary"
            v-show="onEdit"
            @click.prevent="saveTag">Save Tags</b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import server from '@/api/server'
import Tag from "@/components/Tag.vue";
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  name: "watched-tags",
  components: {
    Tag,
    VueTagsInput
  },
  created() {
    this.fetchUserTags()
  },
  data() {
    return {
      tag: "",
      onEdit:false,
    };
  },

  computed: {
    showTag() {
      return this.$store.state.tags
    }
  },
  methods: {
    saveTag() {
      console.log('masuk fungsi')
      const tags = this.tags
      // console.log(tags)
      server
      .patch(`/users/tags`, {tags}, {headers:{token:localStorage.token}})
      .then(({ data }) =>{
        console.log(data)

        this.$store.commit('saveUserTags', data.tags)
        this.onEdit = false;
        // console.log('success update user tags')
      })
      .catch(err => {
        console.log(err.response)
        this.$swal({
          // position: 'top-end',
          type: 'error',
          title: 'Oops error saving',
          text: 'You must be logged in',
          showConfirmButton: false,
          timer: 1500
        })
      })
    },
    fetchUserTags() {
      server
      .get(`/users/tags`, {headers:{token:localStorage.token}})
      .then(({data}) => {
        console.log(data, '----fetch user tags')
        this.tags = data
        this.$store.commit('saveUserTags', data)
      })
      .catch(err => {
        console.log(err.response)
        console.log('error fetching user tags')
      })
    },
    editTag() {
      this.onEdit = true
    }
  },//end of method
};
</script>

<style>
</style>
