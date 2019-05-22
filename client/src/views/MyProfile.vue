<template>
  <div class="container">
    <h1>Username: {{user.username}}</h1>
    <h2>Email: {{user.email}}</h2>
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
