<template>
  <v-container  fluid>
    <v-container  style="margin-top:0px;">
      <v-layout row wrap>
        <img style="height:35vh;" src="FOXCODE (1).png">
        <!-- <h1 class="display-3">foxcode</h1> -->
      </v-layout>
      <v-layout row wrap justify-space-between>
        <v-flex xs2>
          <v-switch
          v-if="isLogin"
            v-model="watched"
            label="Watched"
            color="orange darken-3"
            value="true"
            hide-details
          ></v-switch>
        </v-flex>
        <v-flex xs4>
          <v-text-field
           v-if="isLogin"
           grey--text color="grey" label="Enter title or tag.." outline v-model="search"></v-text-field>
        </v-flex>
        <!-- <v-spacer></v-spacer> -->
        <v-flex xs4 text-xs-right>
          <v-layout row wrap>
            <h4
              class="my-3 caption"
            >We generate dev jobs every 1 minute for you. More detailed informations can be found on affiliate links. <br> Click on list to visit the company's page.</h4>
          </v-layout>
          <!-- <v-btn depressed color="primary">Blm Tay</v-btn> -->
        </v-flex>
      </v-layout>
    </v-container>
    <v-card theme--light>
      <v-layout row wrap>
        <v-flex class="mt-4" xs8>
          <v-list three-line>
            <template>
              <QuestionStripe v-for="(q, index) in listQuestions" :q="q" :key="index"></QuestionStripe>
              <!-- INSERT LOOPING QUESTION STRIPE TILE HERE THIS IS AN EMERGENCY TEMPLATE-->
              <!-- <v-list-tile avatar ripple @click>
                <v-list class="ml-2 mr-5" >
                  <span>heheh</span>
                </v-list >
                <v-list-tile-content>
                   <v-list-tile-title >hehehe</v-list-tile-title>
                  <v-list-tile-sub-title >hehehe</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>-->
            </template>
          </v-list>
        </v-flex>
        <v-flex flat xs4>
          <section
            style="display:flex; margin-top:18vh;margin-left:8vh"
            text-xs-center
            justify-center
            align-center
            v-if="isLoading"
          >
            <pulse-loader :color="'#9e5910'" :size="'19px'"></pulse-loader>
          </section>
          <section v-else>
            <v-card>
              <v-list three-line>
                <template>
                  <v-list-tile
                    :href="job.url"
                    target="_blank"
                    v-for="(job, index) in jobs"
                    :key="index"
                  >
                    <v-divider></v-divider>
                    <v-list-tile-avatar>
                      <img :src="job.company_logo">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{truncate(job.title, 19)}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{job.location}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </section>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import QuestionStripe from "@/components/QuestionStripe.vue";
import { mapState } from "vuex";
import QuestionCard from "@/components/QuestionCard.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  props: [],
  components: { QuestionCard, QuestionStripe, PulseLoader },
  data: () => ({
    socket: io("http://localhost:3000"),
    title: "",
    descriptions: "",
    upVotes: "",
    downVotes: "",
    category: [],
    watched: "",
    search: "",
    jobs: "",
    isLoading: true
  }),
  created() {
    window.addEventListener("keydown", e => {
      if (e.keyCode == 13 && this.search != '' && this.$route.name == 'question' ) {
        this.hitsearch()
        e.preventDefault()
      } else if (e.keyCode == 13 && this.search == '' && this.$route.name == 'question' ) {
        this.$store.dispatch('getQuestions')
      }
    })

    console.log("created!");

    this.socket.on("jobs", data => {
      console.log("waiting...");

      console.log(data, "DAPAAT");
      console.log(this.jobs, "/////");
      this.jobs = data;
      if (this.jobs != "") {
        this.isLoading = false;
      }
    });

    // this.getWatchedTags()
  },
  methods: {
    truncate(isi, max) {
      if (isi.length  > max) {
        return isi.substring(0,max).concat("...")
      } else return isi
    },
    getWatchedTags() {
      console.log("ini gk dari store tp dr bwh");
      console.log(this.watched, "THIS DOT WATCHEDDDDD");

      this.axios
        .get(`/questions/preferred-dicussions`, {
          headers: {
            token: localStorage.getItem("token")
          },
          params: { watched: this.watched }
        })
        .then(({ data }) => {
          this.$store.commit("changeListToWatchedTag", data);
        })
        .catch(err => {console.log(err);
        });
    },
    hitsearch() {
      console.log('hi?', this.search);
      
      this.axios.get(`/questions`, {params : {
            title: this.search,
            tag: this.search
        }})
      .then(({data}) => {
        this.$store.commit("changeListToSearch", data)
      })
      .catch(err => {
        console.log(err);
        
      })
    }
  },
  mounted() {
    this.$store.dispatch("getQuestions");
    // this.getJobs();
  },
  computed: {
    ...mapState(["listQuestions", "isLogin"]),
    // filteredData() {
    //   return this.listQuestions.filter(quest =>
    //     quest.title.toLowerCase().includes(this.search.toLowerCase())
    //   );
    // }
  },
  watch: {
    watched(val) {
      console.log(val, "lalala");

      if (val == "true") {
        this.getWatchedTags();
        console.log("as");
      } else if (val == null) {
        this.$store.dispatch("getQuestions");
      }
    },

  }
};
</script>

<style scope>
</style>