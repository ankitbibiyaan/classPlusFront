<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <b-navbar toggleable="md" type="dark" variant="dark" v-if="['SignUp', 'Login'].indexOf($route.name) < 0">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <!--<b-navbar-brand href="#">My Profile</b-navbar-brand>-->

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="/profile">My Profile</b-nav-item>
      <b-nav-item href="/recent-tracks">Recent Tracks</b-nav-item>
      <!--<b-nav-item href="/favourite_tracks" >Favourite Tracks</b-nav-item>-->
      <b-nav-item href="/top-albums">Top Albums</b-nav-item>
      <b-nav-item href="/top-artists">Top Artists</b-nav-item>
      
    </b-navbar-nav>

     <b-navbar-nav class="ml-auto">
      <b-nav-item href="#" v-on:click="Logout">Logout</b-nav-item>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods :{
    Logout() {
      delete localStorage.token;
      delete localStorage.usn
      this.$router.push("/");
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

/*@import'~bootstrap/dist/css/bootstrap.css'*/
</style>
