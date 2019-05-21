<template>
    <b-badge pill href="#" style="pointer:cursor" @click="find(tag)" class="mx-1" variant="success">{{ tag }}</b-badge>
</template>

<script>
    import axios from '@/api/axios'
    export default {
        name: 'tag',
        props: ['tag'],
        methods: {
            find(tag) {
                this.$router.push('/tagged?tag='+tag)
            }
        }
    }
</script>

<style>

</style>