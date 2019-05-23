<template>
  <div class="text-justify">
    <section v-if="answer.by">
      <div class="container" v-if="!editMode">
        <div class="p-2" v-html="answer.content"></div>
        <div class="p-2 text-right">---answered by {{answerer}} {{askedDaysAgo}}</div>
        <div>
          <b-button 
            size="sm"
            variant="primary"
            v-if="answer.by._id===userId"
            @click="editMode=true,update=true"
          >
            <font-awesome-icon icon="edit"></font-awesome-icon>
          </b-button>
          <b-button size="sm" variant="danger" v-if="answer.by._id===userId" @click="deleteAnswer">
            <font-awesome-icon icon="trash"></font-awesome-icon>
          </b-button>
        </div>
      </div>
    </section>

    <div class="container" v-if="editMode">
      <p>write down your answer...</p>
      <ckeditor :editor="editor" v-model="answer.content" :config="editorConfig"></ckeditor>
      <b-button v-if="!update" variant="outline-primary" @click.prevent="sendAnswer">answer</b-button>
      <b-button v-if="update" variant="outline-secondary" @click.prevent="updateAnswer">update</b-button>
      <b-button v-if="update" variant="outline-secondary" @click.prevent="editMode=false,update=false">cancel</b-button>
    </div>
    <div>{{answer}}</div>
    <hr>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import server from "@/api/api";
import swal from "sweetalert2";
import { mapState, mapGetters } from "vuex";
import moment from "moment";
const dayHandler = d => (d == 1 ? "yesterday" : `${d} days ago`);

export default {
  name: "Answer",
  props: {
    initAnswer: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      update: false,
      answer: {},
      editMode: false,
      form: {},
      editor: ClassicEditor,
      editorConfig: {}
    };
  },

  created() {
    this.answer = this.initAnswer;
    if (
      typeof this.answer === "object" &&
      Object.keys(this.answer).length == 0
    ) {
      this.editMode = true;
    } else {
      this.fetchAnswerData();
    }
  },
  computed: {
    ...mapGetters(["userId"]),
    askedDaysAgo: function() {
      if (moment(this.answer.created_at).isSame(moment(), "day")) {
        return "today";
      } else {
        return dayHandler(
          moment().diff(moment(this.answer.created_at), "days") + 1
        );
      }
    },
    editedDaysAgo: function() {
      if (moment(this.answer.updated_at).isSame(moment(), "day")) {
        return "today";
      } else {
        return dayHandler(
          moment().diff(moment(this.answer.edited_at), "days") + 1
        );
      }
    },
    answerer: function() {
      if (
        this.$store.state.user &&
        this.answer.by._id == this.$store.state.user._id
      ) {
        return `you`;
      } else return this.answer.by.name;
    }
  },
  methods: {
    swalInformer(error) {
      if (error.response) {
        if (error.response.data.message) {
          console.log(error.response.data);
          swal.fire(
            `server says: ${error.response.status}`,
            `${error.response.data.message}`,
            "question"
          );
        } else {
          console.log(error.response.data);
          swal.fire(
            `server says: ${error.response.status}`,
            `check the log`,
            "question"
          );
        }
      } else if (error.request) {
        swal.fire("Server Unreachable", "check your internet", "warning");
        console.log(error.request);
      } else {
        swal.fire("application error", "check log", "error");
        console.log(error);
      }
    },
    async updateAnswer() {
      try {
        let response = await server.patch(`/answer/${this.answer._id}`, {
          content: this.answer.content
        });
        if (response.status == 200) {          
          this.answer.content = response.data.content
          this.answer.updated_at = response.data.updated_at
        }
      } catch (error) {
        this.swalInformer(error);
      } finally {
        this.update=false;
        this.editMode = false;
      }
    },    
    async deleteAnswer() {
      try {
        let confirm = await swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        });
        if (confirm.value) {
          let response = await server.delete(`/answer/${this.$store.state.topic._id}/${this.answer._id}`,);
          if (response.status == 204) {
            this.$store.dispatch("fetchTopic", this.$store.state.topic._id);
          }
          swal.fire("Deleted!", "Your answer has been deleted.", "success");
        }
      } catch (error) {
        this.swalInformer(error);
      }
    },
    async fetchAnswerData() {
      try {
        let response = await server.get(`/answer/${this.answer._id}`);
        if (response.status == 200) {
          this.answer = response.data;
        }
      } catch (error) {
        this.swalInformer(error);
      }
    },
    async sendAnswer() {
      // console.log(this.user)
      if (!this.$store.state.user) {
        swal.fire(
          "not logged in",
          "you need to log in or register to post an answer",
          "warning"
        );
      } else if (!this.answer.content || this.answer.content.length === 0) {
        swal.fire("emptiness", "answer cannot be empty", "warning");
      } else {
        try {
          this.answer.by = this.$store.state.user._id;
          this.answer.questionId = this.$store.state.topic._id;
          let response = await server.post(`/answer`, this.answer);
          if (response.status == 201) {
            swal.fire("thank you", "your answer has been posted", "success");
          }
        } catch (error) {
          this.swalInformer(error);
        } finally {
          this.answer = {};
          this.$store.dispatch("fetchTopic", this.$store.state.topic._id);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
