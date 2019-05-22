<template>
  <div class="container is-fluid">
    <div class="columns is-centered">
      <div class="column is-9">
        <div class="field is-horizontal">
          <div class="field-label"></div>
          <p class="is-size-3 field-body mb16 mt24 has-text-grey">{{formTitle}}</p>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label>Title</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input
                  type="text"
                  class="input"
                  v-model="title"
                  required
                  autofocus
                />
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label>Tags</label>
            </div>
            <div class="field-body">
              <div class="field">
                <VueTagsInput
                  v-model="tag"
                  :tags="tags"
                  @tags-changed="newTags => tags = newTags"
                />
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label>Description</label>
            </div>
            <div class="field-body">
              <div class="field">
                <ckeditor
                  :editor="editor"
                  v-model="description"
                />
              </div>
            </div>
          </div>
          <div class="field">
            <div class="buttons is-right">
              <button class="button is-medium is-success">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  name: 'QuestionForm',
  props: {
    formTitle: String,
    question: Object
  },
  components: {
    VueTagsInput
  },
  data: function () {
    return {
      editor: ClassicEditor,
      title: '',
      description: '',
      tag: '',
      tags: []
    }
  },
  watch: {
    question: function () {
      if (this.question._id) {
        this.title = this.question.title
        this.description = this.question.description
        this.tags = this.question.tags.map(tag => ({
          text: tag,
          tiClasses: ['ti-valid']
        }))
      }
    }
  },
  methods: {
    onSubmit: function () {
      let payload = {
        title: this.title,
        description: this.description,
        tags: this.tags.map(tag => tag.text)
      }

      this.$emit('submit', payload)
    }
  }
}
</script>

<style>
.ck-editor__editable_inline {
  min-height: 320px
}
</style>
