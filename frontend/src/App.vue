<template>
  <div id="app">
    <appHeader></appHeader>
    <div class="main-content">
      <router-view class="container"/>
    </div>
    <footer>
      &copy; 2019 Kenneth Christensen |
      <a href="https://github.com/webMan1/TaskBurnerVue">Source</a> |
      <a href="Https://github.com/webMan1/TaskBurner">API Source</a>
    </footer>
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar.vue";

export default {
  components: {
    appHeader: Navbar
  },
  created() {
      this.$store.dispatch("getClassList");
  }
};
</script>

<style>
#app {
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
}
.main-content {
  flex: 1 0 auto;
  height: 1px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding-top: 50px;
}
header,
footer {
  flex: 0 0 auto;
}

footer {
  background-color: var(--dark);
  color: var(--light);
  text-align: center;
  padding: 0.8rem;
}

footer > a {
  color: var(--light);
  text-decoration: underline;
}

footer > a:hover {
  color: var(--primary);
}
</style>
