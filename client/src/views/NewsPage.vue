<template>
  <v-container fluid style="min-height: 434px">
    <v-fade-transition mode="out-in">
      <v-layout v-if="show" key="0" wrap>
        <v-flex xs10>
          <div class="display-1 font-weight-light pb-3">Top Headlines</div>
          <v-card style="width:620px;" flat>
            <a :href="news[0].url" target="_blank">
              <v-img :src="news[0].urlToImage" aspect-ratio="1.7778" height="320px" width="620px"></v-img>
            </a>
            <v-card-title class="subheading">{{news[0].title}}</v-card-title>
            <v-card-actions>
              <v-btn flat color="black">Read More</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="showMore1 = !showMore1">
                <v-icon>{{ showMore1 ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text v-show="showMore1">{{news[0].description}}</v-card-text>
            </v-slide-y-transition>
          </v-card>
          <v-card style="width:620px;" class="mt-4" flat>
            <a :href="news[6].url" target="_blank">
              <v-img :src="news[6].urlToImage" aspect-ratio="1.7778" height="320px" width="620px"></v-img>
            </a>
            <v-card-title class="subheading">{{news[6].title}}</v-card-title>
            <v-card-actions>
              <v-btn flat color="black">Read More</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="showMore2 = !showMore2">
                <v-icon>{{ showMore2 ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text v-show="showMore2">{{news[6].description}}</v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
        <v-flex xs2 style="width:300px;">
          <v-layout row wrap>
            <h5 class="title font-bold">More From TechCrunch :</h5>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 class="mt-3" v-for="(article, index) in news.slice(1,5)" :key="index">
              <a
                id="caption"
                :href="article.url"
                target="_blank"
                style="text-decoration:none; color:black;"
              >
                <v-layout row wrap>
                  <v-img style="width:300px;height: 165px;" :src="article.urlToImage"></v-img>
                </v-layout>
                <v-layout row wrap style="width:300px;">
                  <span class="subheading my-2">
                    <h5>{{article.title}}</h5>
                  </span>
                </v-layout>
              </a>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout v-else key="1" justify-center>
        <v-flex row wrap>
          <h1>News</h1>
          <h6
            class="my-3 caption"
          >Our News is bringing the most actual headlines, relevant issues and keep updating the most advanced technology around the world.</h6>
          <h4 class="mt-5 font-bold">Supported by :</h4>

          <v-layout row wrap justify-center>
            <div class="my-3">
              <img
                width="140px;"
                height="105px;"
                src="https://d33wubrfki0l68.cloudfront.net/8067c61168d27a8b6b3e865d16424e1aee065759/40d7b/images/uploads/techinasia.png"
                alt
                srcset
              >
            </div>
            <div class="my-3">
              <img
                width="140px;"
                height="105px;"
                src="https://thinkmarketingmagazine.com/wp-content/uploads/2012/08/BBC-Logo-drsign-Evolution-Story-marketing-facts.jpg"
                alt
                srcset
              >
            </div>
            <div class="my-3">
              <img
                width="185px;"
                height="105px;"
                src="https://www.httpool.at/wp-content/uploads/2017/08/480.png"
                alt
                srcset
              >
            </div>
          </v-layout>
          <v-layout row wrap class="my-3" align-center justify-center>
            <div>
              <v-btn color="blue-grey white--text" flat @click.prevent="setNews">Load News</v-btn>
            </div>
            <div>
              <img
                width="370px;"
                height="300px;"
                src="https://assets-ouch.icons8.com/thumb/595/20ef2e92-3583-4306-8465-ca1d9f195b8e.png"
                alt
                srcset
              >
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-fade-transition>
  </v-container>
</template>

<script>
import axios from "axios";
const baseURL = "http://52.221.237.158";
import _ from 'underscore'

export default {
  data() {
    return {
      news: [],
      show: false,
      showMore1: false,
      showMore2: false,
      socket : io('http://52.221.237.158')
    };
  },
  created() {
    this.socket.on('getNews', data => {
      console.log('cron news is triggered?')
      this.news = _.shuffle(data).slice(0, 10);
    })
  },
  methods: {
    setNews() {
      this.show = true;
      this.$store.commit("setNews", true);
    }
  },
  destroyed() {
    this.$store.commit("setNews", false);
  }
};
</script>

<style scoped>
</style>
