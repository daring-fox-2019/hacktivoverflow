<template>
  <div class="container">
    {{user}}
    my profile
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
};
</script>
