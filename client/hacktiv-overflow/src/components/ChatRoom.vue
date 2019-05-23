<template>
  <div class="p-2 animated fadeIn" style="background-color:#eeeeee">
    <div class="d-flex justify-content-center align-items-center">
      <p class="pt-2">
        <b>chit</b> Chat
        <i class="far fa-comment-dots"></i>
      </p>
    </div>
    <div style="overflow:scroll; background-color:white; min-height: 200px; max-height:220px;background-color:#eeeeee" class="p-1">
      <div v-for="(chat, i) in chats" :key="i">
        <p style="font-size:12px">
          <span style="color:#00b894">
            <i>{{ chat.name }}</i>
          </span>
          >> {{ chat.chat }}
        </p>
      </div>
    </div>
    <b-form @submit.prevent="sendChat" class="mt-2">
      <b-form-input v-model="text" placeholder="chat here ..." size="sm"></b-form-input>
      <b-button type="submit" block size="sm" class="mt-2">chat</b-button>
    </b-form>
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
import db from "@/database/firebase.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      chats: [],
      text: ""
    };
  },
  computed: {
    ...mapState(["isLogin"])
  },
  created() {
    db.collection("hacktivChat").onSnapshot(doc => {
      this.chats = [];
      doc.forEach(el => {
        let data = { id: el.id, ...el.data() };
        this.chats.push(data);
      });
    });
  },
  methods: {
    sendChat() {
      if (this.isLogin) {
        db.collection("hacktivChat")
          .add({
            name: localStorage.getItem("name"),
            chat: this.text
          })
          .then(data => {
            this.text = "";
            console.log(data);
          });
      } else {
          this.text=''
          this.$swal('Ooops', 'login first', 'info')
      }
    }
  }
};
</script>

