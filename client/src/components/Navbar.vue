<template>
  <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app id="navbar">
    <v-list>
      <v-list-tile class="mt-3" to="/">
        Home
      </v-list-tile>
      <v-subheader class="mt-3 grey--text text--darken-1">PUBLIC</v-subheader>
      <v-list>
        <v-list-tile to="/listQuestion">
          <v-list-tile-action />
          Stack Overflow
        </v-list-tile>
        <v-list-tile to="/tags">
          <v-list-tile-action />
          Tags
        </v-list-tile>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
#navbar{
  width: 200px !important;
}
</style>
