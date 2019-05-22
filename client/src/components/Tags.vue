<template>
    <v-layout ma-1 ml-2 wrap>
      <v-chip small v-for="(tag, index) in tags" :key="index" @click="search(tag)">{{ tag }}</v-chip>
    </v-layout>
</template>

<script>
export default {
  props: ["tags"],
  methods: {
    search(tag){
      // this.$store.dispatch('searchTag', tag)
      this.$store.commit('searchTag', tag)
      this.$router.push('/')
    }
  },
};
</script>
