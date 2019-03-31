<template>
  <div class="chart-container">
    <router-link :to="'/class/' + link">
      <div class="medium-chart chart-wrapper">
        <canvas ref="chart" class="chart"></canvas>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapMutations } from "vuex";
import RootStore from "../models/root-store";
import ClassInfo from "../models/project";
import Task from "../models/task";
import Chart from "chart.js";

var style = getComputedStyle(document.body);
var primaryColor = style.getPropertyValue("--orange");
var dangerColor = style.getPropertyValue("--red");
var successColor = style.getPropertyValue("--success");

@Component
export default class ProgressPie extends Vue {
  @Prop() classKey!: string;
  @Prop() title!: string;
  @Prop() link!: string;

  constructor() {
    super();
  }

  mounted() {
    this.initialize();
  }

  @Watch("currentClass")
  reset() {
    this.initialize();
  }

  initialize() {
    let canvasElement = <HTMLCanvasElement>this.$refs.chart;
    let context = canvasElement.getContext("2d");
    let dataset = this.chartData;

    new Chart(context!, {
      type: "pie",
      data: dataset,
      options: {
        title: {
          display: true,
          text: dataset.datasets[0].label,
          fontSize: 24
        },
        maintainAspectRatio: false
      }
    });
  }

  get currentClass() {
    let data = <ClassInfo>this.$store.getters.getClass(this.classKey);
    if (data.tasks === undefined) {
            this.$store.dispatch("update", this.classKey);
    }
    return data;
  }

  get chartData() {
    var total = 0;
    var complete = 0;
    let classData = this.currentClass;
    for (var task of classData.tasks) {
      if (task.complete) {
        complete++;
      }

      total++;
    }

    var percent = complete / total;

    return {
      datasets: [
        {
          label: classData.fullName + " Progress",
          data: [percent, 1 - percent],
          backgroundColor: [successColor, primaryColor]
        }
      ],
      labels: ["Complete", "Incomplete"]
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
