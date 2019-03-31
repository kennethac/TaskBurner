<template>
  <div class="class">
    <h2>{{ className }}</h2>
    <AddTask :classKey="classKey" />
    <WeekView v-bind:classKey="classKey"/>
    <ClassTasks v-bind:classKey="classKey"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import WeekView from "@/components/WeekView.vue"; // @ is an alias to /src
import ClassTasks from "@/components/ClassTasks.vue";
import Dashboard from "@/components/Dashboard.vue"; // @ is an alias to /src
import AddTask from "@/components/AddTask.vue"
import Router from "../router";

@Component({
  components: {
    WeekView,
    ClassTasks,
    AddTask
  }
})
export default class Class extends Vue {
  @Prop() classKey!: string;

  classData: object = {
    classKey: ""
  };

  get className() {
    try {
      this.$store.dispatch("update", this.classKey);
      return this.$store.getters.getClass(this.classKey).name;
    } catch (e) {
      return "";
    }
  }
}
</script>
