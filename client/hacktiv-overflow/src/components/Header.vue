<template>
  <div>
    <b-navbar toggleable="lg" variant="light" class="fixed-top">
      <div class="container">
        <router-link to="/">
          <b-navbar-brand>
            <i class="fas fa-code"></i> over<b>flow</b>
          </b-navbar-brand>
        </router-link>

        <b-collapse id="nav-collapse" is-nav>
          <b-nav-form style="width:74%">
            <b-form-input
              size="sm"
              class="mr-sm-2"
              style="width:100%"
              placeholder="Search"
              v-model="search"
            ></b-form-input>
          </b-nav-form>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <div>
            <b-navbar-nav class="ml-auto">
              <div class="d-flex align-items-center" v-if="isLogin">
                <b-nav-item-dropdown
                  size="sm"
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                >
                  <template slot="button-content">
                    <b-button size="sm" variant="outline-primary">
                      <i class="fas fa-list-alt"></i>
                    </b-button>
                  </template>

                  <b-dropdown-item>
                    <router-link to="/my-question">My Question</router-link>
                  </b-dropdown-item>
                </b-nav-item-dropdown>
              </div>

              <div class="d-flex align-items-center">
                <b-button variant="secondary" size="sm" class="mr-2" @click="back">
                  <i class="fas fa-arrow-left"></i>
                </b-button>
              </div>
           
              <div class="d-flex align-items-center mr-2" v-if="!isLogin">
                <router-link to="/login">
                  <b-button variant="outline-primary" size="sm">
                    <i class="fas fa-torii-gate"></i> Login
                  </b-button>
                </router-link>
              </div>
              <div class="d-flex align-items-center" v-if="isLogin">
                <router-link to="/register">
                  <b-button variant="primary" size="sm" @click="logout">
                    <i class="fas fa-hiking"></i> Logout
                  </b-button>
                </router-link>
              </div>
            </b-navbar-nav>
          </div>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      search: ""
    };
  },
  watch: {
    search() {
      if (this.$route.name == "my-question") {
        this.$store.dispatch("getUserQuestions", this.search);
      } else {
        this.$store.dispatch("getAllQuestions", this.search);
      }
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    logout(){
      localStorage.clear()
      this.$store.commit('setIsLogin', false)
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

