<template>
  <div class="ui grid">
    <GChart
      style="width: 100%"
      type="LineChart"
      :data="chartDataComputed"
      :options="chartOptions"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SingleDayForecast } from "../../services/WeatherService";

@Component
export default class DailySummary extends Vue {
  @Prop() private weather: SingleDayForecast;

  get chartDataComputed() {
    let chartData = [];
    chartData.push(["Hour", "Temperature"]);
    chartData.push(
      ...(this.weather.forecast || []).map(f => {
        return [f.time, f.temp];
      })
    );
    return chartData;
  }

  chartOptions = {
    chart: {
      title: "Daily Weather Summary",
      subtitle: "Temperature"
    }
  };
}
</script>
