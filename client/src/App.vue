<template>
  <v-app>
    <v-toolbar app height="47" class='toolbar'>
      <v-toolbar-title class="headline">
        <router-link to="/" class="link"><span>HacktivOverflow</span></router-link>
      </v-toolbar-title>
      <v-toolbar-items hidden-sm-only>
       <!--  <v-flex xs12 sm12 ml-5> -->
          <v-text-field class="searchInput"
              placeholder="Search questions..."
              single-line
              solo
              append-icon="search"
            ></v-text-field>
        <!-- </v-flex> -->
      </v-toolbar-items>
      <v-flex>
        <v-spacer></v-spacer>
      </v-flex>
      <v-toolbar-items hidden-sm-only>
          <v-flex align-self-center mr-2 v-if="$store.state.isLogin"  >
            <span>Welcome, {{username}}</span>
          </v-flex>
          <v-btn v-if="$store.state.isLogin" to="/profile" flat>
            <v-avatar
              :tile="tile"
              :size="40"
              color="grey lighten-4"
              >
              <img src="https://storage.googleapis.com/ecommerce-client.andresuchitra.com/profile/1555731943170-Andre%20test.jpg" alt="avatar">
            </v-avatar>
          </v-btn>
          <v-btn v-if="$store.state.isLogin" @click="logout" flat>Logout</v-btn>
          <v-btn v-if="!$store.state.isLogin" to="/login" flat>Login</v-btn>
          <v-btn v-if="!$store.state.isLogin" to="/register" flat>Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-layout>
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
  created() {
    if(localStorage.getItem('hackflow_token')) {
      this.$store.dispatch('getUser');
      this.$store.commit('setIsLogin', true)
    }
  },
  data () {
    return {
      //
      tile: true,
    }
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
.toolbar {
  position: fixed;
  top: 0;
  border-top: 3px solid rgb(255, 102, 0);
}

.link {
  color: inherit;
  text-decoration: inherit;
}
.content {
  border-left: 2px solid rgba(128, 128, 128, 0.3);
  min-height: 100vh;
  height: auto;
  width: 85%;
  margin-left: 15%;
  background: white;
  padding: 20px;
}

.sidePanel {
  position: fixed;
  top: 46px;
  max-width: 15%;
  min-height: 100vh;
  height: auto;
  background: white;
}

</style>