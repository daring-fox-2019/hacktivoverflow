<template>
  <v-app>
    <v-toolbar dark color="primary">
      <!--LOGO-->
      <span> <i class="fab fa-stack-overflow"></i> hackticvoverflow</span>

      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
        <v-text-field placeholder="Search" v-model="search"></v-text-field>
      </v-flex>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <router-link to="/auth" v-if="!isLogin">
            <v-icon dark v-on="on" @click.prevent="getAuth('login')">lock_open</v-icon>
          </router-link>
          <router-link to="/" v-else-if="isLogin">
            <v-icon dark v-on="on" @click.prevent="clear">lock_outline</v-icon>
          </router-link>
        </template>
        <span v-if="!isLogin">Login</span>
        <span @click.prevent="logout" v-else-if="isLogin">Logout</span>
      </v-tooltip>

      <div></div>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <router-link to="/auth">
            <v-icon
              dark
              v-on="on"
              @click.prevent="getAuth('register')"
              style="margin-left:10px"
            >fingerprint</v-icon>
          </router-link>
        </template>
        <span>Sign Up</span>
      </v-tooltip>
    </v-toolbar>

    <v-container grid-list-md fluid>
      <v-layout row wrap>
        <!-- LEFT -->
        <v-flex xs2 text-xs-center>
          <div>
            <router-link to="/" style="text-decoration: none">
              <v-btn color="blue-grey" class="white--text">
                Home
                <v-icon right dark>home</v-icon>
              </v-btn>
            </router-link>
          </div>
          <div>
            <v-btn color="blue-grey" class="white--text" @click.prevent="getUserQuestions">
              Users
              <v-icon right dark>person</v-icon>
            </v-btn>
          </div>
          <v-container class="watched-tags my-3">
            <v-layout
              fluid
              row
              justify-center
              align-center
              xl-12
              class="pb-3"
              style="border-bottom: 1px solid #eeeeee"
            >
              <i class="fas fa-eye px-1"></i>
              <h5>Watched Tags</h5>
            </v-layout>
            <v-layout row>
              <v-img
                src="https://assets-ouch.icons8.com/thumb/56/ba7a9d88-d404-44c9-b662-7c9842bc98d4.png"
              ></v-img>
            </v-layout>
            <v-layout row wrap>Watch tags to curate your list of questions.</v-layout>
            <v-layout row wrap justify-center>
              <v-btn
                color="blue-grey"
                class="white--text mt-3"
                @click.prevent="getWatchedTags"
              >Watch</v-btn>
            </v-layout>
          </v-container>
          <div>
            <v-btn color="blue-grey" class="white--text" @click.prevent="getNewsAPI">
              News
              <i class="fas fa-newspaper pl-4"></i>
            </v-btn>
          </div>
          <v-layout row wrap v-if="isLogin">
            <div class="mt-1 body-2"> Current Preferred Discussion :</div>
            <div class="text-xs-center" v-for="(tag, index) in watchedTags.favTags" :key="index">
              <v-chip close small @input="deleteUserTags(tag._id)">
                <v-avatar class="teal text-uppercase">{{tag.tagName[0]}}</v-avatar>
                {{tag.tagName}}
              </v-chip>
            </div>
          </v-layout>
        </v-flex>
        <!-- CENTER -->
        <v-flex xs8 grow pa-1 justify-center>
          <v-content>
            <router-view :search="search"></router-view>
          </v-content>
        </v-flex>
        <!-- RIGHT -->
        <v-flex xs2 v-if="!newsPage">
          <v-container grid-list-xs class="mt-4" style="padding: 0px">
            <div style="border-bottom: 1px solid #eeeeee" class="text-xs-center">
              <i class="fas fa-briefcase px-2 pb-4"></i>Looking for a jobs?
            </div>
              <v-layout
                row
                style="border-bottom: 1px solid #eeeeee"
                v-for="(job, index) in jobs"
                :key="index"
                class="card-layout"
              >
                <v-flex xs2>
                  <v-avatar size="30px">
                    <img :src="job.company_logo" alt>
                  </v-avatar>
                </v-flex>
                <v-flex xs10 class="px-3">
            <a :href="job.url" target="_blank" style="text-decoration:none">
                  <div class="caption" style="color: black">{{job.title}}</div>
                  <h5 class="caption type font-weight-regular">{{job.type}}</h5>
            </a>
                </v-flex>
              </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import _ from "underscore";
const baseURL = "http://localhost:3000";
import axios from "axios";

export default {
  name: "App",
  components: {},
  data() {
    return {
      items: ["Home", "Users"],
      search: "",
      jobs: [],
      socket : io('http://localhost:3000')
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.state.isLogin = true;
      this.getTags();
      // this.getJobsAPI();
    } else {
      this.$store.state.isLogin = false;
      this.$store.state.watchedTags = [];
      // this.getJobsAPI();
    }
        this.socket.on('getJobs', data => {
          console.log('cron is triggered?')
          this.jobs = data
        })
  },
  computed: {
    ...mapState(["isLogin", "watchedTags","newsPage"])
  },
  watch: {
    newsPage(val){
      console.log(`newsPage : ${val}`)
    }
  },
  methods: {
    clear() {
      localStorage.clear();
      this.$store.state.isLogin = false;
      this.$swal("success", "Successfully logout", "success");
    },
    getAuth(value) {
      this.setAuth(value);
    },
    getUserQuestions() {
      if (!localStorage.getItem("token")) {
        this.$swal("Sorry", "Please login to continue", "warning");
      } else {
        this.$router.push({ path: `/questions/myList` });
      }
    },
    getWatchedTags() {
      this.$router.push({ path: `/questions/tags` });
    },
    deleteUserTags(id) {
      axios
        .patch(
          `${baseURL}/users/preferred-discussions`,
          { tag: id },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          console.log(data);
          this.getTags();
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapMutations(["setAuth"]),
    ...mapActions(["getTags"]),
    getNewsAPI() {
      this.$router.push("/news");
    },
    getJobsAPI() {
      axios
        .get(`${baseURL}/API/jobs`)
        .then(({ data }) => {
          this.jobs = _.shuffle(data).slice(0, 10);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
.type {
  color: #00b7a8;
}
.watched-tags {
  border: 1px solid #eeeeee;
}

.white--text {
  width: 112px;
}

.ck-editor__editable_inline {
  min-height: 200px;
  min-width: 800px;
  max-width: 800px;
}

.ck-toolbar {
  min-width: 800px;
  max-width: 800px;
}
</style>

