<template>
    <b-badge @click="find(tag)" class="mx-1" href="#" variant="info">{{ tag }}</b-badge>
</template>

<script>
export default {
    name: 'tag',
    props: ['tag'],
    methods: {
        find(tag){
            this.$emit('findbytag', tag)
        }
    }
}
</script>

<style>

</style>
