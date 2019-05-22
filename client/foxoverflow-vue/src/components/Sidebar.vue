<template>
  <v-navigation-drawer width="auto" floating style="max-height: fit-content; margin-right: 1rem;">
    <v-list class="py-0">
      <v-list-tile
        v-for="(item, index) in items"
        :key="index"
        @click="setCurrentPage(item.title)"
        :class="{'sidebar-current': currentPage === item.title}"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      items: [
        { title: "FoxOverflow", icon: "fas fa-globe-americas" },
        { title: "Home", icon: "fas fa-home" },
        { title: "Tags", icon: "fas fa-tags" },
        { title: "Users", icon: "fas fa-user-friends" }
      ],
      right: null
    };
  },
  created() {
    if (localStorage.currentPage) {
      this.$store.commit("setCurrentPage", localStorage.currentPage);
    }
  },
  computed: {
    ...mapState(["currentPage"])
  },
  methods: {
    setCurrentPage(currentPage) {
      console.log(currentPage);
      localStorage.currentPage = currentPage;
      this.$store.commit("setCurrentPage", currentPage);
      if (currentPage === "Home") {
        this.$router.push(`/`);
      } else {
        this.$router.push(`/${currentPage.toLowerCase()}`);
      }
    }
  }
};
</script>

<style>
.sidebar-current {
  background-color: rgb(253, 211, 177);
  /* background-color: rgb(177, 182, 253); */
}
</style>
