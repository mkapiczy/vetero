<template>
  <div id="dayMenu" class="ui top attached tabular stackable menu">
    <a
      class="item"
      v-for="singleDayWeather in weatherForecastsByDay"
      :key="singleDayWeather.date"
      @click="onDayChosen(singleDayWeather)"
      :class="{
        active: selectedDayForecast
          ? selectedDayForecast.date === singleDayWeather.date
          : false
      }"
    >
      <div class="one column stackable grid">
        <div class="row">
          {{ singleDayWeather.date }}
        </div>
        <div class="row">
          <i class="tint icon"></i>
          {{ singleDayWeather.mainWeather.humidity }}%
        </div>
        <div class="row">
          {{ singleDayWeather.mainWeather.tempMax }}
        </div>
        <div class="row">
          {{ singleDayWeather.mainWeather.tempMin }}
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">
#dayMenu {
  flex: none;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SingleDayForecast } from "../services/WeatherService";
@Component
export default class DayMenu extends Vue {
  @Prop() private selectedDayForecast!: SingleDayForecast;
  @Prop() private weatherForecastsByDay!: Array<SingleDayForecast>;

  onDayChosen(selectedDayForecast: SingleDayForecast) {
    this.$emit("onDayChosen", selectedDayForecast);
  }
}
</script>
