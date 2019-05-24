<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <p>

    {{user}}    
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex'

export default {
  name: 'home',
  computed:mapState(['user']),
  
}
</script>
