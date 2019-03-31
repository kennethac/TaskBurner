<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark primary-bg">
      <a class="navbar-brand" href="#">TaskBurner</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/combined" class="nav-link">Combined</router-link>
          </li>
          <li v-for="c in upperCaseNames" :key="c" class="nav-item">
            <router-link :to="'/class/' + c.toLowerCase()" class="nav-link">{{c}}</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/class/create" class="nav-link bright">New Class</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="header-logo-wrapper"></div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Navbar extends Vue {
  //   @Prop() private msg!: string;
  get upperCaseNames() {
    return this.$store.getters
      .getClasses()
      .map((name: string) => name[0].toUpperCase() + name.substr(1));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.primary-bg {
  background-color: var(--orange);
}

.header-logo-wrapper {
  background-color: white;
  border: var(--orange) 10px solid;
  border-radius: 50%;
  height: 160px;
  width: 160px;
  background-image: url("/img/blaze_sm.png");
  background-color: white;
  background-position: center;
  background-size: 120px;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: calc(50vw - 80px);
  z-index: 100;
}

.navbar {
  min-height: 80px;
}

li > a.router-link-exact-active.nav-link, li > a.nav-link.bright {
  color: #fff;
}
</style>
