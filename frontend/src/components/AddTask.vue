<template>
  <div>
    <button data-toggle="collapse" href=".new-task-container" class="btn btn-primary">Add Task</button>
    <form class="collapse new-task-container" @submit.prevent="addTask">
      <div class="form-group row">
        <label class="col-md-3">Task Name</label>
        <div class="col-md-9">
          <input v-model="newTaskName" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3">Task Due Date</label>
        <div class="col-md-9">
          <input type="date" v-model="newTaskDueDate" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-md-3">Task Due Date</label>
        <div class="col-md-9">
          <input type="date" v-model="newTaskScheduledDate" class="form-control">
        </div>
      </div>
      <button>Add Task</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import Task from "../models/task";
import store from "../store";

@Component
export default class AddTask extends Vue {
  @Prop() classKey!: string;
  newTaskName: string = "hey";
  newTaskDueDate: string | null = null;
  newTaskScheduledDate: string | null = null;

  async addTask() {
    console.log(this.newTaskName + " " + this.newTaskDueDate);
    if (!this.inputValid) {
      return;
    }

    // this.$store.commit("addTask", {
    //   classKey: this.classKey,
    //   task: new Task(this.newTaskName, new Date(this.newTaskDueDate!), new Date(this.newTaskScheduledDate!), false)
    // });
    const url = "/projects/" + this.classKey + "/add";
    const data = new Task(
      this.newTaskName,
      new Date(this.newTaskDueDate as string),
      new Date(this.newTaskScheduledDate as string),
      false,
      ""
    );
    await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
    });
    store.dispatch("update", this.classKey);
    this.newTaskName = "";
    this.newTaskDueDate = null;
    this.newTaskScheduledDate = null;
  }

  get inputValid() {
    return (
      this.newTaskDueDate != null &&
      this.newTaskName != null &&
      Date.parse(this.newTaskDueDate) != undefined &&
      this.newTaskName.trim().length > 0
    );
  }

  @Watch("newTaskDueDate")
  updateScheduledDate() {
    if (this.newTaskScheduledDate === null) {
      this.newTaskScheduledDate = this.newTaskDueDate;
    }
  }
}
</script>

<style scoped>
.new-task-container {
  padding: 20px 0;
}
</style>
