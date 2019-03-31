<template>
  <div>
    <h3>All Tasks</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Completed</th>
          <th>Task</th>
          <th>Due Date</th>
          <th>Scheduled Date</th>
        </tr>
      </thead>
      <tbody class="upcoming-area">
        <tr v-for="task in currentClass.tasks" :key="task.name">
            <td>{{ task.complete ? "Yes" : "No" }}</td>
            <td>{{ task.name }}</td>
            <td>{{ task.shortDueDate }}</td>
            <td>{{ task.shortScheduledDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapMutations } from "vuex";
import RootStore from "../models/root-store";
import ClassInfo from "../models/project";
import Task from "../models/task";

@Component
export default class ClassTasks extends Vue {
  @Prop() private classKey!: object;

  constructor() {
    super();
  }

  get currentClass() {
    this.$store.dispatch("update", this.classKey);
    return <ClassInfo>this.$store.getters.getClass(this.classKey);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
