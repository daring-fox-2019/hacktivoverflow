<template>
  <div class="home">
    <v-container>  
      <v-layout fluid>
        <v-flex style="border: 1px solid black;">
          <v-layout align-center justify-space-between fluid px-5 py-3>
            <h2>Top Questions</h2>
            <v-btn color="blue" to="/addQuestion">Ask Question</v-btn>
          </v-layout>
          <v-divider/>
        </v-flex>

        <v-flex xs3>
          <v-layout fluid justify-center>
            <v-card id="watch-tag">
              <v-toolbar color="dark" style="justify-content:center;">
                <v-toolbar-title >Watch tag</v-toolbar-title>
              </v-toolbar>
              <v-card-text>tes</v-card-text>
            </v-card>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>

<style scoped>
#watch-tag {
  width: 90%;
  border-radius: 5px;
}

.container{
  margin: 0;
}
</style>
