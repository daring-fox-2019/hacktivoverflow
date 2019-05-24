<template>
<v-navigation-drawer permanent>
    <v-list dense class="pt-3">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.link"
      >
        <v-list-tile-action class="actionIcon">
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
export default {
    name: 'Sidebar',
    data() {
      return {
        items: [
          {
            title: 'Home',
            icon: 'dashboard',
            link: '/'
          },
          {
            title: 'Questions',
            icon: 'question_answer',
            link: '/questions'
          },
          {
            title: 'Tags',
            icon: 'category',
            link: '/tags'
          },
        ]
      }
    }
}
</script>

<style scoped>
.actionIcon {
  max-width: 30px;
  width: auto;
  min-width:30px;
}
</style>
