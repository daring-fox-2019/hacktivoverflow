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
  </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
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
    
  }
}
</script>
