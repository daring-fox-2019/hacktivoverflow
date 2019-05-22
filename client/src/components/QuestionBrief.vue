<template>
  <div class="container-fluid shadow-sm m-2">
    <div class="row">
      <div class="col-md-8 mb-2 text-justify" no-border>
          <h4>{{question.title}}</h4>
          <p>asked by: {{question.by.name}}</p>        
        <b-button variant="outline-primary" :to="'/topic/'+question._id">Read More</b-button>
      </div>
      <div class="col-md-4">
        <div class="row">
          <div class="col-sm-4 p-3">
            <p class="text-center">Votes</p>
            <p class="text-center">1000</p>
          </div>
          <div class="col-sm-4 p-3">
            <p class="text-center">Answers</p>
            <p class="text-center">1000</p>
          </div>
          <div class="col-sm-4 p-3">
            <p class="text-center">Views</p>
            <p class="text-center">1000</p>
          </div>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionBrief",
  props: ["question"]
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
