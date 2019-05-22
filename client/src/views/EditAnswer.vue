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
            <!-- <b-form-group
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
            </b-form-group> -->

          <div style="font-size:16px;" >
            Edit Your Answer:
          </div>
          <wysiwyg v-model="answer" />

          <div style="font-size:16px;"
            class="py-2">
            Preview Answer
          </div>

          <div
            class="border p-2"
            v-html="answer"
            style="min-height: 35px;">
          </div>

          <!-- Tags
          <vue-tags-input
            v-model="tag"
            :tags="tags"
            @tags-changed="newTags => tags = newTags"
            style="max-width:none; width:100%;"
          /> -->

          <!-- <b-form-group id="input-editor-title" label="Article Title:" label-for="editor-title">
              <b-form-input type="text" id="editor-title" required placeholder="Enter description"
                  ></b-form-input>
            </b-form-group> -->
            <div class="py-2">
              <b-button
                size="sm"
                variant="outline-primary"
                @click.prevent="editAnswer">
                Edit Answer
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
  name: 'edit-answer',
  components: {
    LeftNav,
    WatchedTags,
    Tag,
    VueTagsInput,
  },
  created() {
      this.fetchAnswerEdit();
  },
  data() {
    return {
      answer: '',
    };
  },
  methods: {
    fetchAnswerEdit() {
        const answer_id = this.$route.params.id
        server
        .get(`/answers/${answer_id}`)
        .then(({ data }) => {
          this.answer = data.answer;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editAnswer() {
      const answer_obj = {
        answer: this.answer,
      };
      const answer_id = this.$route.params.id

      server
        .patch(`/answers/${answer_id}`, answer_obj, { headers: { token: localStorage.token } })
        .then(({ data }) => {
            this.$router.push(`/questions/${data.question}`);
        })
        .catch((err) => {
            console.log(err.response);
        });

    //   console.log(answer);
    //   this.$store.dispatch('submitNewQuestion', question_obj)
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
