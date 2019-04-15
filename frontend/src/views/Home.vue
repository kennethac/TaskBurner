<template>
  <div class="home" v-if="loggedIn">
    <Dashboard/>
  </div>
  <div class="home container" v-else>
    <div class="row">
      <div class="col-md-6">
        <About/>
      </div>
      <div class="col-md-6">
        <LoginRegister class="home-login"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Dashboard from "@/components/Dashboard.vue"; // @ is an alias to /src
import LoginRegister from "@/components/LoginRegister.vue";
import About from "@/views/About.vue";

@Component({
  components: {
    Dashboard,
    LoginRegister,
    About
  }
})
export default class Home extends Vue {
  async created() {
    await this.$store.dispatch("getUser");
  }
  get loggedIn() {
    return this.$store.getters.getUser() != undefined;
  }
}
</script>

<style scoped>
.home-login {
  margin-top: 90px;
}
</style>
