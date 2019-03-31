<template>
  <div>
    <h3>Scheduled Tasks</h3>
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
        <template v-for="day in scheduledDays">
          <tr :key="day.first" class="day-header">
            <td colspan="4">
              <strong>{{ new Date(day.first).toDateString() }}</strong>
            </td>
          </tr>
          <tr v-for="task of day.group" :key="task.name">
            <td>{{ task.complete ? "Yes" : "No" }}</td>
            <td>{{ task.name }}</td>
            <td>{{ task.shortDueDate }}</td>
            <td>{{ task.shortScheduledDate }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapMutations } from "vuex";
import RootStore from "@/models/root-store";
import ClassInfo from "@/models/class-info";
import Task from "@/models/task";

function addDays(date: Date, days: number) {
  return new Date(date.valueOf() + days * 86400000);
}

function groupBy(list: Task[], selector: Function) {
  if (list.length == 0) {
    return [];
  }

  let result = [];

  var first = selector(list[0]);
  let group: Task[] = [];
  for (var i of list) {
    if (selector(i) == first) {
      group.push(i);
    } else {
      result.push({ first, group });
      group = [i];
      first = selector(i);
    }
  }

  if (group.length > 0) {
    result.push({ first, group });
  }

  return result;
}

@Component
export default class Weekview extends Vue {
  @Prop() private classKey!: string;

  constructor() {
    super();
  }

  get currentClass() {
    this.$store.dispatch("update", this.classKey);
    return <ClassInfo>this.$store.getters.getClass(this.classKey);
  }

  get scheduledDays() {
    let classData = this.currentClass;
    if (classData === undefined || classData.tasks === undefined) {
      return [];
    }

    let soon = classData.tasks.filter(
      t => new Date(t.scheduledDate) < addDays(new Date(), 7)
    );

    return groupBy(soon, (t: Task) => new Date(t.scheduledDate).valueOf());
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
