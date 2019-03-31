<template>
  <div>
    <h2>Create a new class</h2>
    <form @submit.prevent="createClass">
      <div class="alert alert-warning" v-show="showMessage">{{ message }}</div>
      <div class="form-group">
        <label class="col-md-3">Class Name</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="fullName">
        </div>
      </div>
      <div class="form-group">
        <label class="col-md-3">Short Name</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="shortName" pattern="[a-z]{2:5}">
        </div>
      </div>
      <button class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CreateClass extends Vue {
  public fullName?: string = "";
  public shortName?: string = "";
  public message?: string = "";

  get showMessage() {
    return this.message !== "";
  }

  public get x() {
    return "Hey!";
  }

  public async createClass() {
    const baseUrl = process.env.VUE_APP_ENDPOINT + "projects/create";
    const result = await fetch(baseUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        fullName: this.fullName,
        shortName: this.shortName
      })
    });

    const content = await result.json();
    if (!result.ok) {
      this.message = content.message;
    } else {
      this.$router.push({
        name: "class",
        params: { classKey: this.shortName }
      });
    }
  }
}
</script>
