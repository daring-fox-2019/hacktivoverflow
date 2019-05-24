<template>
  <v-app>
    <v-toolbar app height="47" pl-0 class='toolbar pl-0'>
        <router-link to="/" class="link titleLink">
      <v-toolbar-title class="headline titleBrand">
          <img class="logo" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-icon.png?v=c78bd457575a">
          <div class="titleText">HacktivOverflow</div>
      </v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
      <v-flex lg6 xs8 ml-2>
        <v-text-field class="searchInput"
            placeholder="Search questions..."
            single-line
            append-icon="search"
            v-model="searchKey"
            clearable
            @change="search"
          ></v-text-field>
      </v-flex>
      <v-flex>
        <v-spacer></v-spacer>
      </v-flex>
      <v-toolbar-items hidden-sm-only>
          <v-flex align-self-center mx-3 v-if="$store.state.isLogin"  >
            <span>Welcome, {{username}}</span>
          </v-flex>
          <v-btn v-if="$store.state.isLogin" to="/profile" flat>
            <v-avatar
              :size="40"
              color="grey lighten-4"
              >
              <img :src="$store.state.user.image" alt="avatar">
            </v-avatar>
          </v-btn>
      </v-toolbar-items>
      <v-btn v-if="!$store.state.isLogin" to="/register" flat>Register</v-btn>
      <v-btn v-if="!$store.state.isLogin" to="/login" color="red" small dark>Login</v-btn>
      <v-btn v-if="$store.state.isLogin" @click="logout" class="red smallbtn" small dark>Logout</v-btn>
    </v-toolbar>
    <v-content class="mainContent">
      <v-layout row>
        <v-flex class="sidePanel">
          <Sidebar></Sidebar>
        </v-flex>
        <v-flex class="content">
          <router-view />
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
  },
  data() {
    return {
      searchKey: '',
    }
  },
  mounted() {
    this.$store.dispatch('getUser');
    
    if(localStorage.getItem('hackflow_token')) {
      this.$store.commit('setIsLogin', true)
    }
    this.$store.dispatch('getTags')
  },
  computed: {
    username: function() {
      if(!this.$store.state.user) {
        return 'default-user'
      }
      return this.$store.state.user.firstname
    }
  },
  methods: {
    search() {
      console.log('search..');
      if(this.searchKey) {
        this.$router.push('/questions/search/' + this.searchKey);
      }
    },
    logout() {
      localStorage.removeItem('hackflow_token')
      this.$store.commit('setIsLogin', false)
      this.$store.commit('setUser', null)
      this.$router.push('/')
    },
  }
}
</script>
<style scoped>
.logo {
  width: auto;
  height: 47px;
}
.toolbar {
  position: fixed;
  top: 0;
  padding-left: 0;
  border-top: 3px solid rgb(255, 102, 0);
}
.titleBrand {
  min-width: 175px;
  height: inherit;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.titleText {
  letter-spacing: -1px;
  font-size: 0.9em;
  position: relative;
  font-weight: 700px;
  left: -9px;
}
.link {
  color: inherit;
  text-decoration: inherit;
  height: inherit;
}
.content {
  min-height: 100vh;
  height: auto;
  width: calc(100vh - 12%);
  margin-left: 12%;
  background: white;
  padding: 20px;
}

.sidePanel {
  position: fixed;
  top: 46px;
  max-width: 12%;
  min-width: 125px;
  min-height: 100vh;
  z-index: 1;
  height: auto;
  background: white;
  border-right: 1px solid lightgrey;
}
.titleLink {
  margin-left: -24px;
}

div {
  font-size: 12px;
}
</style>