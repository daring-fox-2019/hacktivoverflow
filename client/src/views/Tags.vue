<template>
  <v-container full-height>
    <v-layout row>
      <v-flex xs12 md9 lg10>
        <v-layout row wrap>
          <v-card class="tagCard ma-2 tagCardBtn" v-for="tag in $store.state.tags" :key="tag._id">
            <router-link dark class="tagLink tagCard" :to="`questions/tagged/${tag.name}`">
              <v-card-title primary-title>
                <div>{{ tag.name }}</div>
              </v-card-title>
            </router-link>
          </v-card>
        </v-layout>
      </v-flex>
      <v-flex xs8 sm4 md3 lg2>
        <v-form ref="addTagForm" @submit.prevent="addTag" class="addTagForm">
          <v-text-field id="inputTag"
            type="text"
            v-model="newTag"
          ></v-text-field>
          <v-btn type="submit" color="orange darken-4" dark>Add</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import http from '@/api/http'

export default {
  name: "Tags",
  data() {
      return {
          newTag: '',
      }
  },
  methods: {
      clearForm() {
          this.newTag = '';
      },
      addTag() {
          http
            .post('tags', {name: this.newTag.toLowerCase()}, {headers: {Authorization: localStorage.hackflow_token}})
            .then(({ data }) => {
                swal.fire('Success', 'Tag added', 'success')
                this.$store.state.tags.push(data)
                this.clearForm();
            })
            .catch(err => {
                if(err.response) {
                    err=  err.response.data
                }
                swal.fire('Error', err.message, 'error')
            })
      }
  }
};
</script>

<style scoped>
.tagCard {
  min-width: 100px;
  font-size: 1.2em;
  background-color: #f44336;
}

.tagCard:hover {
  background-color: rgb(250, 151, 69);
}
.tagLink {
  text-decoration: none;
  color: white;
  text-align: center;
}

#inputTag {
    height: 30px;
    font-size: 0.7em;
}
.addTagForm {
    padding: 10px;
    border: 1px dashed rgba(255, 68, 0, 0.575);
}
.tagCard:hover:after {
    /* position: absolute;
    top: 0;
    left: 10px;

    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #303030;
    content: "<v-btn icon><v-icon>delete</v-icon></v-btn>"; */
}
</style>
