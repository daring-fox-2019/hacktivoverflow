<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/profile">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="blue lighten-5">
      <v-toolbar-side-icon @click.prevent="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>HACKTIV</span>
        <span class="font-weight-light">OVERFLOW</span>
      </v-toolbar-title>
      <v-form @submit.prevent="searchQuestions">
        <v-text-field
          v-model="searchText"
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="search"
          label="Search"
          class="hidden-sm-and-down ml-4"
        ></v-text-field>
      </v-form>
      <v-spacer></v-spacer>
      <v-btn
        flat
        to="/newquestion"
        color="success"
      >
        <span class="mr-2">Ask Question</span>
      </v-btn>
      <v-btn
        flat
        @click="loginOrOut"
        color="primary"
      >
        <span class="mr-2">{{logText}}</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      drawer: false,
      searchText: '',
      logText: 'Login'
    }
  },
  watch: {
    $route(){
      this.drawer = false
      // if(!localStorage.getItem('token'))
      //   this.$router.push('/auth')
    }
  },
  created(){
    if(!localStorage.getItem('token'))
      this.logText = 'Login'
    else this.logText = 'Logout'
    this.$store.dispatch('getAllQuestions')
  },
  methods: {
    // createQuestion(){
    //   this.$router.push()
    // },
    searchQuestions(){
      this.$store.dispatch('searchQuestions',this.searchText)
      // this.$router.push('/search')
    },
    loginOrOut(){
      if(this.logText == 'Logout'){
        localStorage.removeItem('token')
        localStorage.removeItem('name')
      }
      this.$router.push('/auth')
    },

  }
}
</script>
