<template>
    <!-- <router-link to="/question">
    <span
        class="d-flex py-0 px-1 mr-1 tag-css"
        style="widht:auto; font-size: 11px; background-color:#ddffc9">
        {{text}}
    </span>

    </router-link> -->
    <a href="#" @click="searchBy">
        <span class="badge mr-1 badge-info">
            {{tag}}
        </span>
    </a>
</template>

<script>
export default {
  name: 'tag',
  props: ['tag'],
  data() {
    return {
    };
  },
  methods: {
    searchBy() {
      let search_obj = {
        tags: this.tag,
        question: this.tag,
        description: this.tag,
      }

      console.log(search_obj)
      this.$store.dispatch('searchBy', search_obj)
      this.$router.push('/questions')
    },
  }
};
</script>
<style>
.tag-css {
    text-decoration: none;
    color: black;
}
.tag-css:hover {
    text-decoration: none;
    color: black;
}
</style>
