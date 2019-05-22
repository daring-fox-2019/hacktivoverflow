<template>
  <b-container fluid>
    <b-container>
      <b-row>
        <b-col cols="2" class="pr-0">
          <!-- left navbar -->
          <LeftNav/>
        </b-col>
        <!-- middle -->
        <b-col class="px-3 d-flex flex-column">
            <b-form-group
              id="input-editor-title"
              label="Question Title:"
              style="font-size:16px;"
              label-for="editor-title">
              <b-form-input
                type="text"
                id="editor-title"
                v-model="question"
                required placeholder="Enter question title here"
                  ></b-form-input>
            </b-form-group>

          <div style="font-size:16px;" >
            { Type1 }
          </div>
          <wysiwyg v-model="description" />

          <div style="font-size:16px;"
            class="py-2">
            { Preview }
          </div>

          <div
            class="border p-2"
            v-html="description"
            style="min-height: 35px;">
          </div>

          Tags
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
            <div class="py-2">
              <b-button
                size="sm"
                variant="outline-primary"
                @click.prevent="editQuestion">
                Submit
              </b-button>
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
import server from '@/api/server';
import LeftNav from '@/components/LeftNav.vue';
import WatchedTags from '@/components/WatchedTags.vue';
import Tag from '@/components/Tag.vue';
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'edit-question',
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
  created() {
    this.fetchQuestionEdit();
  },
  methods: {
    fetchQuestionEdit() {
      const question_id = (this.$route.params.id);
      server
        .get(`/questions/${question_id}`)
        .then(({ data }) => {
          this.question = data.question;
          this.description = data.description;
          this.tags = data.tags;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editQuestion() {
      const question_obj = {
        question: this.question,
        description: this.description,
        tags: this.tags,
      };
      console.log(question_obj, '----quesiton obj')
      const question_id = this.$route.params.id;

      server
        .patch(`/questions/${question_id}`, question_obj, { headers: { token: localStorage.token } })
        .then(({ data }) => {
          this.$router.push(`/questions/${data._id}`);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  computed: {
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
