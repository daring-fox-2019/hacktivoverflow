<template>
  <div id="app" class='d-flex flex-column'>
    <div id="nav">
      <b-navbar
        toggleable='lg'
        type="dark"
        variant='light'
        style="height:60px"
        class="d-flex justify-content-around"
      >
        <router-link to='/'>
          <b-navbar-brand>
            <div style="max-height: 65px;max-width: 65px; border-radius:60px; overflow:hidden">
              <img src="https://cdn.dribbble.com/users/1025112/screenshots/4744274/document.gif" alt="" style="max-height: 100%; max-width: 100%">
            </div>
          </b-navbar-brand>
        </router-link>
         <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class='mx-auto'>
              <b-nav-form @submit.prevent='search'>
                <b-form-input
                size="sm"
                class="mr-sm-2"
                v-model='searchInput'
                placeholder="Search Question"
                style="width:700px; margin-left:160px"
              ></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="outline-dark">Search</b-button>
              </b-nav-form>
            </b-navbar-nav>
            <b-navbar-nav class='ml-auto'>
              <b-nav-item class='px-1'>
                <router-link to='/login'>
                  <b-button size='sm' variant='outline-primary' v-if='!this.$store.state.isLogin'>Login</b-button>
                </router-link>
              </b-nav-item>
              <b-nav-item class='px-1'>
                <router-link to='register'>
                  <b-button size='sm' variant='outline-primary' v-if='!this.$store.state.isLogin'>Register</b-button>
                </router-link>
              </b-nav-item>
              <b-nav-item class='px-1'>
                <router-link to='/questions'>
                  <b-button size='sm' variant='outline-primary' v-if='this.$store.state.isLogin'>New question</b-button>
                </router-link>
              </b-nav-item>
              <b-nav-item class='px-1'>
                <b-button size='sm' variant='outline-primary' v-if='this.$store.state.isLogin' @click.prevent='logout'>Log Out</b-button>
              </b-nav-item>
              <b-nav-item class='px-1'>
                <router-link to='/myQuestions'>
                  <b-button size='sm' variant='outline-primary' v-if='this.$store.state.isLogin'>My Questions</b-button>
                </router-link>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
      </b-navbar>
    </div>
    <router-view :searchResult='searchResult'/>
    <Footer class='mt-auto'/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import axios from '@/api/server/axios.js'
import moment from 'moment'
export default {
  components:{
    Footer
  },
  data(){
    return {
      searchInput: '',
      searchResult: []
    }
  },
  created(){
    if (localStorage.getItem("token")){
      axios
        .get('/users/one', {headers:{
          token: localStorage.token
        }})
        .then(({ data })=>{
          this.$store.commit('getUser', data)
          this.$store.commit('loggedIn')
        })
        .catch(err=>{
          console.log(err)
        })
      
    }
  },
  methods:{
    emptySearch(){ 
      this.searchResult =[]
    },
    search(){
      this.$router.push({path: '/'})
      axios
        .get(`/questions/search?title=${this.searchInput}`)
        .then(({ data })=>{
          this.searchResult =  data.map(el=>{
            el.time = moment(el.createdAt).fromNow()
            return el
          })
        })
        .catch(err=>{
          console.log(err)
        })
    },
    logout(){
      this.$swal({
        dangerMode: true,
        title: `Are you sure to sign out?`,
        icon: "warning",
        buttons: ["Cancel", "Yes!"]
      }).then(result => {
        if (result) {
          this.$swal({
            title: `Bye bye!`,
            text: `Hope to see you soon!`,
            icon: "success",
            buttons: ["Cancel", "Yes!"]
          });
          this.$router.push({ path: "/" });
          localStorage.clear();
          this.$store.commit('logout')
        } else {
        }
      });
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh !important;
}
#nav {
  padding: 0px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
