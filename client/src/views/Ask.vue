<template>
  <b-container fluid>
    <b-container>
      <b-row>
        <b-col cols="2" class="pr-0">
          <!-- left navbar -->
          <LeftNav/>
        </b-col>
        <!-- middle -->
        <b-col class="px-3 my-4 d-flex flex-column border-left">
          <div class="mb-4">
            Ask Your Own Question
          </div>
            <b-form-group
              id="input-editor-title"
              label="Title:"
              style="font-size:17px;"
              label-for="editor-title">
              <b-form-input
                type="text"
                id="editor-title"
                v-model="question"
                required placeholder="Enter question title here"
                  ></b-form-input>
            </b-form-group>

          <div style="font-size:16px;" >
            Description:
          </div>
          <wysiwyg v-model="description" />

          <div style="font-size:16px;"
            class="py-2 pb-0">
            Preview
          </div>

          <div
            class="border p-2"
            v-html="description"
            style="min-height: 35px;">
          </div>

          <div class="py-2">
            Tags
          </div>
          <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
            style="max-width:none; width:100%;"
          />

          <!-- <b-form-group id="input-editor-title" label="Article Title:" label-for="editor-title">
              <b-form-input type="text" id="editor-title" required placeholder="Enter description"
                  ></b-form-input>
            </b-form-group> -->
            <div class="pt-3">
              <b-button
                size="sm"
                variant="outline-primary"
                @click.prevent="submitNewQuestion">
                Submit
              </b-button>
            </div>
            <div style="height: 80px;">

            </div>
        </b-col>
        <!-- right -->
        <b-col cols="3" class="pl-0">
          <b-container>
            <b-row>
              <b-col>
                <WatchedTags/>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import LeftNav from '@/components/LeftNav.vue';
import WatchedTags from '@/components/WatchedTags.vue';
import Tag from '@/components/Tag.vue';
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'ask-new-question',
  components: {
    LeftNav,
    WatchedTags,
    Tag,
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      description: ' ',
      question: '',
    };
  },
  methods: {
    submitNewQuestion() {
      const question_obj = {
        question: this.question,
        description: this.description,
        tags: this.tags,
      };

      console.log(question_obj);
      this.$store.dispatch('submitNewQuestion', question_obj);
    },
  },
};
</script>

<style>
  /* .ti-input {
    width: 631px;
  } */

  pre {
    background-color:lightgrey;
    padding: 7px;
    margin-top: 12px;
  }
</style>
