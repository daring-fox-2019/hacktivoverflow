<template>
  <div class="text-xs-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>dashboard</v-icon>
        </v-btn>
      </template>
      <v-list>
        <router-link to="/myDashboard" style="textDecoration:none;">
          <v-list-tile>
            <v-list-tile-title>My Questions</v-list-tile-title>
          </v-list-tile>
        </router-link>
        <v-divider></v-divider>
        <router-link to="/myAnswers" style="textDecoration:none;">
          <v-list-tile>
            <v-list-tile-title>My Answers</v-list-tile-title>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {};
</script>
<style>
</style>
