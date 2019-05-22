<template>
  <v-form>
    <v-layout row wrap>
      <v-flex xs12>
        v-model="newQuestion.title"
        :rules="requiredRule"
        <v-text-field autofocus label="Title" required></v-text-field>
      </v-flex>
      <v-flex xs12>
        :rules="requiredRule"
        v-model="newQuestion.description"
        <v-textarea name="description" label="Description" auto-grow></v-textarea>
      </v-flex>
      <slot></slot>
      <v-flex xs12>
        <div class="mb-2">
          <label for="tags">Tags</label>
        </div>
        <div>
          v-model="newQuestion.tags"
          <input-tag></input-tag>
        </div>
      </v-flex>
      <v-flex xs12 class="mt-2">
        @click.prevent="createQuestion"
        <v-btn>Submit</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  name: "form",
  data() {
    return {};
  },
  props: []
};
</script>

<style>
</style>
