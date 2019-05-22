<template>
  <v-container fluid>
    <v-container>
      <section  v-if="isLoading">
      <rise-loader style="margin-top:20vh;" :color="color" :size="size"></rise-loader>
      <center><span style="margin-top:13vh;"> Fetching the lastest buzz for you.. </span>   </center>
      </section>
      <v-layout v-else row wrap>
        <v-flex xs6>
          <v-card class="px-2 mx-1 my-1" flat>
            <v-img height="255px" class="white--text" :src="news[0].urlToImage">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">{{news[0].title}}</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title>
              <div>
                <span class="grey--text">{{truncate(news[0].content, 250)}}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn :href="news[0].url" outline color="orange">Read</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex class="p-2" xs6>
          <v-layout class="p-2" row wrap>
            <v-flex class="p-2" xs12>
          <v-card flat> 
                <v-img
                  :src="news[1].urlToImage"
                  height="200px"
                >
                  <v-container
                    fill-height
                    fluid
                    pa-2
                  >
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline white--text" >{{news[1].title}}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn  :href="news[1].url" icon>
                    <v-icon>book</v-icon>
                  </v-btn>

                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout class="p-2" row wrap>
            <v-flex class="p-2" xs12>
              <v-card flat class="grey--text px-2 py-2 mx-1 my-1">
                <v-layout>
                  <v-flex xs5>
                    <v-img
                      :src="news[3].urlToImage"
                      height="125px"
                      contain
                     
                    ></v-img>
                  </v-flex>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div :href="news[3].url"  ><b>{{news[3].title}}</b></div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  {{truncate(news[3].content, 125)}}
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import RiseLoader from "vue-spinner/src/RiseLoader.vue";

export default {
  
  data() {
    return {
     socket: io("http://localhost:3000"),
      news : "",
      color : 'black',
      size: "9px",
      isLoading : true
    };
  },
  components: {RiseLoader },
  created() {
    this.socket.on("news", data => {
      console.log("waiting to fetch news...");

      console.log(this.news, "/////");
      this.news = data;
      if (this.news != "") {
        this.isLoading = false;
      }
    });
  }, methods: {
    truncate(isi, max) {
      if (isi.length > max) {
        return isi.substring(0,max).concat('...')
      } else return isi
    }
  },
};
</script>

<style>
</style>
