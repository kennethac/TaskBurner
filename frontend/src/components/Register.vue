<template>
  <form class="form" @submit.prevent="login">
    <h3>Register</h3>
    <div class="form-group" v-show="error">
      <div class="alert alert-warning">{{ error }}</div>
    </div>
    <div class="form-group">
      <label>First name</label>
      <input v-model="firstName" class="form-control">
    </div>
    <div class="form-group">
      <label>Last name</label>
      <input v-model="lastName" class="form-control">
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
      <button class="btn btn-primary">Register</button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class Register extends Vue {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  error: string = "";

  async login() {
    try {
      this.error = await this.$store.dispatch("register", {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName
      });
      if (this.error === "") this.$router.push("Home");
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
