<template>
  <div class="p-2 col">
    <div class="border-bottom">
      <b-container fluid class="mb-2">
        <b-row>
          <b-col cols="2" class="px-0">
            <b-container>
              <b-row>
                <!-- left card -->
                <b-col class="p-1" cols="6">
                  <b-container fluid style="text-align:center;">
                    <b-row>
                      <b-col style="font-size:16px;" class="px-0">{{totalLike}}</b-col>
                    </b-row>
                    <b-row>
                      <b-col class="px-0" style="font-size:10px;">votes</b-col>
                    </b-row>
                  </b-container>
                </b-col>

                <b-col class="p-1" cols="6">
                  <b-container fluid style="text-align:center;">
                    <b-row>
                      <b-col style="font-size:16px;" class="px-0">xx</b-col>
                    </b-row>
                    <b-row>
                      <b-col class="px-0" style="font-size:10px;">answers</b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
          <!-- right col -->
          <b-col class="px-0">
            <b-container fluid>
              <b-row class="d-flex justify-content-between">
                <b-col cols="12" class="text-wrap">
                  <router-link :to="'/questions/' + question._id">{{question.question}}</router-link>
                </b-col>
                <b-col class="pr-1">
                  <b-container fluid>
                    <b-row class="d-flex justify-content-between align-content-between">
                      <div>
                        <Tag v-for="(tag, index) in question.tags" :key="index" :tag="tag.text"/>
                      </div>
                      <div style="font-size:12px;" class="px-0 d-flex align-items-end">
                        <!-- {{question.updatedAt}} -->
                        <span>{{ question.updatedAt | moment("from") }}</span>
                        , asked by {{question.user.name}}
                      </div>
                    </b-row>
                  </b-container>
                </b-col>
                <!-- <b-col class="text-right grow d-flex">
                        {{question.updatedAt}} {{question.user.name}}
                </b-col>-->
              </b-row>
            </b-container>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Tag from "@/components/Tag.vue";

export default {
  name: "question-list-card",
  props: ["question"],
  components: {
    Tag
  },
  data() {
    return {};
  },
  computed: {
    totalLike() {
      return (
        Number(this.question.upvotes.length) -
        Number(this.question.downvotes.length)
      );
    }
  }
};
</script>

<style>
</style>
