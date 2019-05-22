<template>
<v-layout column>
    <v-flex x12 sm12 md12 lg12>
        <router-view ></router-view>
    </v-flex>
</v-layout>
</template>

<script>
export default {
    name: 'Questions',
    mounted() {
        this.$store.dispatch('getUser');
    }
}

</script>

<style>

</style>
