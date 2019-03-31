<template>
  <div class="new-task-container">
    <h4>Add Task</h4>
    <input v-model="newTaskName">
    <input type="date" v-model="newTaskDueDate">
    <input type="date" v-model="newTaskScheduledDate">
    <button @click="addTask">Add Task</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import Task from "../models/task";
import { stringify } from "querystring";
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
    const url = process.env.VUE_APP_TASKS_ENDPOINT + this.classKey + "/add";
    const data = new Task(this.newTaskName, new Date(this.newTaskDueDate), new Date(this.newTaskScheduledDate), false);
    await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
