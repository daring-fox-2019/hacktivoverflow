<template>
  <v-container
    style="width: 40%; background-color: white; border-radius: 5px; padding-left: 3rem; padding-right: 3rem; padding-bottom: 0.5rem; margin-top: 3%;"
  >
    <Login/>
  </v-container>
</template>

<script>
import Login from "../components/Login";

export default {
  components: {
    Login,
  }
};
</script>