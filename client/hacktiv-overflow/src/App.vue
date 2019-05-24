<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
      integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
      crossorigin="anonymous"
    >
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css" integrity="sha256-gVCm5mRCmW9kVgsSjQ7/5TLtXqvfCoxhdsjE6O1QLm8=" crossorigin="anonymous" />
    <Header/> 
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue';
import axios from '@/database/axios';

export default {
  components: {
    Header,
    Footer,
  },
  created(){
    if(localStorage.getItem('token')){
      this.$store.commit('setIsLogin', true)
    }
  }
};
</script>


<style>
  a {
    text-decoration: none !important;
  }
  a:hover {
    /* //text-decoration: none !important; */
    color:#ff7675;
    transition: transform .5s ease;
  }
  button {
    border-radius: 0px !important;
  }
  .card {
    border-radius: 0px !important;
  }
  input {
    border-radius: 0px !important;
  }
  img {
    border-radius: 0px !important;
  }
  .btn-outline-primary {
    color: #00b894 !important;
    border-color: #00b894 !important;
  }
  .btn-outline-primary:focus {
    color: #00b894 !important;
    border-color: #00b894 !important;
  }
  .btn-primary{
    color: white !important;
    border-color: #00b894 !important;
    background-color: #00b894 !important;
  }

  .btn-primary:hover, .btn-primary:focus, .btn-primary:active, .btn-primary.active, .open>.dropdown-toggle.btn-primary {
    color: #fff !important;
    background-color: #00b894 !important;
    border-color: #00b894 !important; /*set the color you want here*/
}

.btn-outline-primary:hover, .btn-outline-primary:focus, .btn-outline-primary:active, .btn-outline-primary.active, .open>.dropdown-toggle.btn-outline-primary {
    color: #fff !important;
    background-color: #00b894 !important;
    border-color: #00b894 !important; /*set the color you want here*/
}
</style>
