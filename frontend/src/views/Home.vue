<template>
  <div class="home" v-if="loggedIn">
    <Dashboard/>
  </div>
  <div class="home" v-else>
    <LoginRegister />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Dashboard from "@/components/Dashboard.vue"; // @ is an alias to /src
import LoginRegister from "@/components/LoginRegister.vue";
@Component({
  components: {
    Dashboard, LoginRegister
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
