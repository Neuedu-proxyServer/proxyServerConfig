<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';

export default {
  name: "App",
  components: {
    Home, Login
  },
};
</script>

<style>
@import "../static/normalize.css";
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
