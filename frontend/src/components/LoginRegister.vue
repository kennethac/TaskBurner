<template>
  <div class="loginRegister">
    <div class="login-area" v-show="loggingIn">
      <login></login>
      <button class="btn btn-primary" @click="showLogin(false)">I need to register</button>
    </div>
    <div class="register-area" v-show="!loggingIn">
      <register></register>
      <button class="btn btn-primary" @click.prevent="showLogin(true)">I need to login</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Login from "./Login.vue";
import Register from "./Register.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {
    Login,
    Register
  }
})
export default class LoginRegister extends Vue {
  loggingIn: Boolean = true;

  showLogin(value: Boolean) {
    this.loggingIn = value;
  }
}
</script>
