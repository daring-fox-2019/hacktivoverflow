<template>
  <v-app style="background-color: rgba(255, 183, 110, 0.1)">
    <Navbar/>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    HelloWorld,
    Navbar,
  },
  data() {
    return {
      //
    };
  }
};
</script>
<style>
* {
  /* background-color: rgba(255, 183, 110, 0.397); */
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
