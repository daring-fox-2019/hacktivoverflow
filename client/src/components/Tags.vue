<template>
  <div>
    <v-chip
      small
      v-for="(tag, index) in tags"
      :key="index"
      @click="searchTags(tag)"
    >{{ tag }}</v-chip>
  </div>
</template>

<script>
export default {
  props: ['tags'],
};
</script>
