<template>
  <div class="col-sm-12 well">
    <div class="well">
      <p>
        <a href="#">My Profile</a>
      </p>
      <img
        src="https://img.icons8.com/bubbles/2x/administrator-male.png"
        class="img-circle"
        height="65"
        width="65"
        alt="Avatar"
      >
    </div>
    <p>
      <router-link to="/">Home</router-link>
    </p>
    <p>Public</p>
    <p>
      <router-link to="/questions">Hacktiv Overflow</router-link>
    </p>
    <p>
      <router-link to="/users">Users</router-link>
    </p>
  </div>
</template>
