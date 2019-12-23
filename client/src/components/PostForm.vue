<template>
  <div>
    <v-text-field
      v-model="title"
      name="name"
      label="Title"
      placeholder="Title"
      single-line
    ></v-text-field>
    <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor>
    <v-btn @click="$emit('submitted',title,description)" color="primary" dark class="mt-4">Submit</v-btn>
    <slot></slot>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  props: ['value'],
  data(){
    return {
      editor: ClassicEditor,
      title: '',
      description: '',
      editorConfig: {
            // The configuration of the editor.
        }
    }
  },
  methods: {
    
  },
  created(){
    if(this.value){
      this.title = this.value.title
      this.description = this.value.description
    }
  }
}
</script>
