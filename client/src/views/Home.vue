<template>
  <div class="hello mt-4">
    <h1>Welcome to HacktivOverflow</h1>
    <img src="https://media.wired.com/photos/5926db217034dc5f91becd6b/master/w_1904,c_limit/so-logo-s.jpg" width="300" height="300">
    <p>
      HacktivOverflow is a question and answer site for professional and enthusiast programmers. It is a privately held website.
    </p>
    <h3>Lets register</h3>
    <ul>
      <li><router-link to="/login">login</router-link></li>
      <li><router-link to="/register">register</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.hello{
  text-align: center
}
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
