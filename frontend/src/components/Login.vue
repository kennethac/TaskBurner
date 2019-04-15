<template>
  <form class="form" @submit.prevent="login">
    <h3>Login</h3>
    <div class="form-group" v-show="error">
      <div class="alert alert-warning">{{ error }}</div>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input v-model="email" class="form-control">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" v-model="password" class="form-control">
    </div>
    <div class="from-group">
      <button class="btn btn-primary">Login</button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  email: string = "";
  password: string = "";
  error: string = "";

  async login() {
    try {
      this.error = await this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
      if (this.error === "") this.$router.push("Home");
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
