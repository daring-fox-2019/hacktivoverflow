<template>
  <b-container fluid class="px-0">
    <div class="container">
      <b-navbar toggleable="lg" type="dark" variant="info" class="py-0">
        <b-navbar-brand to="/" class="py-0 d-flex align-items-center">
          <span style="font-size:25px;">
            <i class="fab fa-stack-overflow"></i>
          </span>
          <span>
            &nbsp;hacktiv
            <strong>overflow</strong>
          </span>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>

          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form @submit.prevent="submitSearch" >
              <b-form-input size="sm" class="mr-sm-2"
                style="width:200px;"
                v-model="searchbar"
                placeholder="Search"></b-form-input>
            <RegisterModal v-show="!isLogin"/>
            <LoginModal v-show="!isLogin"/>


              <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->
            </b-nav-form>
            <b-nav-item-dropdown right  v-show="isLogin">
              <!-- Using 'button-content' slot -->

              <template slot="button-content" >
                <em>{{username}}</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item 
                @click.prevent="signOut">Sign out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </b-container>
</template>

<script>
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
  name: 'navbar',
  components: {
    LoginModal,
    RegisterModal,
  },
  created() {
    this.debouncedSearch = _.debounce(this.searchBy, 750)
    if(localStorage.token) {
      this.isLogin = true
      this.$store.commit('submitLogin')
    }
  },
  data() {
    return {
      searchbar: '',
      // isLogin: false,
    }
  },
  methods: {
    searchBy() {
      //isi query
      const search_obj = {
        question: this.searchbar,
        description: this.searchbar,
        tags: this.searchbar,
      }
      console.log(search_obj)
      console.log('masuk debounce search')
      this.$store.dispatch('searchBy', search_obj)
      setTimeout(() => {
        this.$router.push('/questions')
      },500)
    },
    submitSearch() {
      console.log('clicked');
    },
    signOut() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          this.$store.commit('signOut');
        }
      });
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.session.isLogin;
    },
    username() {
      return localStorage.name
    }

  },//end of computed
  watch: {
    searchbar() {
      this.debouncedSearch()
    }
  },//end of watch
};
</script>

<style>
</style>
