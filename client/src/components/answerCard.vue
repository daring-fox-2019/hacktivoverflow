<template>
  <v-card>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs1 justify-center>
          <v-flex style="display: flex;" justify-center>
            <v-icon
              class="linker"
              v-show="!upvoteAns"
              @click.prevent="upvoteAnswer(item._id)"
            >arrow_drop_up</v-icon>
            <v-icon
              color="blue"
              class="linker"
              v-show="upvoteAns"
              @click.prevent="upvoteAnswer(item._id)"
            >arrow_drop_up</v-icon>
          </v-flex>
          <v-flex style="display: flex;" justify-center>{{ item.totalVote }}</v-flex>
          <v-flex style="display: flex;" justify-center>
            <v-icon
              class="linker"
              v-show="!downvoteAns"
              @click.prevent="downvoteAnswer(item._id)"
            >arrow_drop_down</v-icon>
            <v-icon
              color="blue"
              class="linker"
              v-show="downvoteAns"
              @click.prevent="downvoteAnswer(item._id)"
            >arrow_drop_down</v-icon>
          </v-flex>
        </v-flex>
        <v-flex xs11>
          <h3>{{ item.title }}</h3>
          <p v-html="item.description" style="text-align: justify;"></p>
          <div>
            <!-- @click="test(tag)" -->
            <v-chip
              v-for="(tag, index) in item.tags"
              :key="index"
              color="grey darken-4"
              label
              small
              class="font-weight-bold ma-1 linker"
            >{{ tag }}</v-chip>
          </div>
          <p style="text-align: right;">{{ item.user.name }} on {{ item.createdAt }}</p>
        </v-flex>
        <v-layout v-if="item.user._id == userId">
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
                        <v-text-field label="Title" v-model="currentAns.title" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>Description</v-flex>
                      <v-flex xs12>
                        <v-card light>
                          <wysiwyg v-model="currentAns.description"></wysiwyg>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat @click.prevent="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat @click.prevent="editAnswer(item._id)">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
          <v-btn @click.prevent="deleteAnswer(item._id)" color="error">Delete</v-btn>
        </v-layout>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "answerCard",
  props: ["item"],
  data() {
    return {
      upvoteAns: false,
      downvoteAns: false,
      userId: "",
      dialog: false,
      currentAns: {
        title: "",
        description: ""
      }
    };
  },
  methods: {
    editAnswer(id) {
      let { title, description } = this.currentAns
      axios({
        method: 'put',
        url: `http://localhost:3000/answers/${id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          title, description
        }
      })
        .then(({ data }) => {
          swal.fire('Success!', 'Answer Edited', 'success')
          this.dialog = false
          this.$emit('update-answer-hard')
        })
        .catch(err => {
          console.log({ err });
          err.origin = "answercard.vue - editanswer";
          this.$emit("error", err);
        })
    },
    deleteAnswer(id) {
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
          Swal.fire("Deleted!", "Your answer has been deleted.", "success");
          axios({
            method: "delete",
            url: `http://localhost:3000/answers/${id}`,
            headers: {
              token: localStorage.token
            }
          })
            .then(({ data }) => {
              swal.fire('Success!', 'Answer deleted', 'success')
              this.$emit('update-answer-hard')
            })
            .catch(err => {
              console.log({ err });
              err.origin = "answercard.vue - deleteanswer";
              this.$emit("error", err);
            });
        }
      });
    },
    test(tag) {
      swal.fire(tag);
    },
    voteCheck(data) {
      data.createdAt = new Date(data.createdAt).toDateString();
      this.upvoteAns = false;
      this.downvoteAns = false;
      data.upvotes.forEach(item => {
        if (item._id === localStorage.id) {
          this.upvoteAns = true;
        }
      });
      data.downvotes.forEach(item => {
        if (item._id === localStorage.id) {
          this.downvoteAns = true;
        }
      });
    },
    upvoteAnswer(id) {
      axios({
        method: "put",
        url: `http://localhost:3000/answers/${id}/upvote`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$emit("update-answer", data);
        })
        .catch(err => {
          console.log({ err });
          err.origin = "answercard.vue - upvoteanswer";
          this.$emit("error", err);
        });
    },
    downvoteAnswer(id) {
      axios({
        method: "put",
        url: `http://localhost:3000/answers/${id}/downvote`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$emit("update-answer", data);
        })
        .catch(err => {
          console.log({ err });
          err.origin = "answercard.vue - upvoteanswer";
          this.$emit("error", err);
        });
    },
    trigger() {
      this.voteCheck(this.item);
      if (localStorage.id) {
        this.userId = localStorage.id;
      }
      this.currentAns = {
        title: this.item.title,
        description: this.item.description
      };
    }
  },
  created() {
    this.trigger()
  },
  watch: {
    item() {
      this.voteCheck(this.item);
    }
  }
};
</script>

<style>
</style>
