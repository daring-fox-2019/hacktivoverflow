<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs1 justify-center>
          <v-flex style="display: flex;" justify-center>
            <v-icon
              class="linker"
              v-show="!upvote"
              @click.prevent="upvoteQuestion(currentQuestion._id)"
            >arrow_drop_up</v-icon>
            <v-icon
              color="blue"
              class="linker"
              v-show="upvote"
              @click.prevent="upvoteQuestion(currentQuestion._id)"
            >arrow_drop_up</v-icon>
          </v-flex>
          <v-flex style="display: flex;" justify-center>{{ currentQuestion.totalVote }}</v-flex>
          <v-flex style="display: flex;" justify-center>
            <v-icon
              class="linker"
              v-show="!downvote"
              @click.prevent="downvoteQuestion(currentQuestion._id)"
            >arrow_drop_down</v-icon>
            <v-icon
              color="blue"
              class="linker"
              v-show="downvote"
              @click.prevent="downvoteQuestion(currentQuestion._id)"
            >arrow_drop_down</v-icon>
          </v-flex>
        </v-flex>
        <v-flex xs11>
          <p v-html="currentQuestion.description" style="text-align: justify;"></p>
          <div>
            <v-chip
              v-for="(tag, index) in currentQuestion.tags"
              :key="index"
              color="grey darken-4"
              label
              small
              class="font-weight-bold ma-1 linker"
            >{{ tag }}</v-chip>
          </div>
          <p style="text-align: right;">Asked by {{ name }} on {{ createdAt }}</p>
          <v-layout v-if="currentQuestion.user._id == userId">
            <!-- <modal-edit @edit="editQuestion(currentQuestion._id)" :currentQuestion="currentQuestion"></modal-edit> -->
            <v-layout>
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark v-on="on">Edit</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">User Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="Title" v-model="current.title" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>Description</v-flex>
                        <v-flex xs12>
                          <v-card light>
                            <wysiwyg v-model="current.description"></wysiwyg>
                          </v-card>
                        </v-flex>
                        <v-flex xs12>
                          <div>Tag</div>
                          <input-tag v-model="current.tags"></input-tag>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.prevent="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.prevent="edit(currentQuestion._id)">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>

            <v-btn color="error" @click.prevent="deleteQuestion(currentQuestion._id)">Delete</v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import modalEdit from "../components/modalEdit.vue";
import inputTag from 'vue-input-tag'

export default {
  name: "question",
  props: ["currentQuestion", "upvote", "downvote"],
  components: {
    modalEdit, inputTag
  },
  data() {
    return {
      dialog: false,
      name: "",
      createdAt: "",
      userId: "",
      current: {
        title: '',
        description: '',
        tags: []
      }
    };
  },
  methods: {
    upvoteQuestion(id) {
      this.$emit("upvote-parent", id);
    },
    downvoteQuestion(id) {
      this.$emit("downvote-parent", id);
    },
    edit(id) {
      let { title, description, tags } = this.current
      axios({
        method: 'put',
        url: `http://34.87.71.136/questions/${id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          title, description, tags
        }
      })
        .then(({ data }) => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log({ err });
          err.origin = "question.vue - deletequestion";
          this.$emit("error", err);
        })
    },
    deleteQuestion(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Swal.fire("Deleted!", "Your question has been deleted.", "success");
          axios({
            method: "delete",
            url: `http://34.87.71.136/questions/${id}`,
            headers: {
              token: localStorage.token
            }
          })
            .then(({ data }) => {
              this.$router.push("/");
            })
            .catch(err => {
              console.log({ err });
              err.origin = "question.vue - deletequestion";
              this.$emit("error", err);
            });
        }
      });
    }
  },
  created() {
    if (localStorage.id) {
      this.userId = localStorage.id;
    }
  },
  watch: {
    currentQuestion() {
      this.name = this.currentQuestion.user.name;
      this.createdAt = this.currentQuestion.createdAt;
      this.current = {
        title: this.currentQuestion.title,
        description: this.currentQuestion.description,
        tags: this.currentQuestion.tags
      }
      
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
