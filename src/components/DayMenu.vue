<template>
  <div
    id="dayMenu"
    class="ui top attached stackable tabular loading menu"
    :class="{ disabled: disabled }"
  >
    <a
      class="item"
      v-for="singleDayWeather in forecastsByDay"
      :key="singleDayWeather.date"
      @click="onDayChosen(singleDayWeather)"
      :class="{
        active: forecastForSelectedDay.date === singleDayWeather.date
      }"
    >
      <div class="one column stackable grid">
        <div class="row" style="margin-bottom: 10px;">
          {{ singleDayWeather.date }}
        </div>
        <div class="row">
          <i class="tint icon"></i>
          {{ singleDayWeather.averageWeather.humidity }}%
        </div>
        <div class="row">
          {{ singleDayWeather.averageWeather.tempMax }}
        </div>
        <div class="row">
          {{ singleDayWeather.averageWeather.tempMin }}
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">
#dayMenu {
  flex: none;
  min-height: 20%;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SingleDayForecast } from "../services/WeatherService";
@Component
export default class DayMenu extends Vue {
  @Prop() private forecastForSelectedDay!: SingleDayForecast;
  @Prop() private forecastsByDay!: Array<SingleDayForecast>;
  @Prop() private disabled!: boolean;

  onDayChosen(selectedDayForecast: SingleDayForecast) {
    this.$emit("daySelected", selectedDayForecast);
  }
}
</script>
