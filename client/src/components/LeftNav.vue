<template>
  <b-list-group style="height:100% border-left">
    <b-list-group-item
      v-for="(link, index) in links"
      :key="index"
      :to="link.to"
      :active="link.to == path"
      @click="test"
      class="py-1"
    >{{link.title}}</b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: 'left-navigation',
  methods: {
    test() {
      console.log(this.path)
    }
  },
  data() {
    return {
      links: [
        {
          to: '/questions',
          title: 'Question',
          active: 'questions'
        },
        {
          to: '/ask',
          title: 'Ask a Question',
          active: 'ask'
        },
      ],
    };
  },
  computed: {
    path() {
      return window.location.pathname
    }
  }
};
</script>

<style scoped>
a.router-link-exact-active {
  background-color: lightcyan;
  border: none;
  color: black;
}

.listgroup-item {
  border: none;
}
</style>
