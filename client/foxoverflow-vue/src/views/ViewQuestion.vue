<template>
  <div>
    <div class="container" style="width: 70%;">
      <v-layout row wrap>
        <v-flex xs3>
          <Sidebar/>
        </v-flex>
        <v-flex xs9 style="border-left: 1px solid rgba(191, 54, 12, 0.4); padding-left: 1rem;">
          <Question/>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Question from "../components/Question";

export default {
  components: {
    Sidebar,
    Question,
  },
}
</script>

<style>

</style>
