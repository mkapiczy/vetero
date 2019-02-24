<template>
  <div
    id="dayMenu"
    class="ui top attached tabular menu segment"
    :class="{ loading: disabled }"
  >
    <a
      class="item"
      v-for="singleDayWeather in forecastsByDay"
      :key="singleDayWeather.date"
      @click="onDaySelected(singleDayWeather)"
      :class="{
        active: forecastForSelectedDay.date === singleDayWeather.date
      }"
    >
      <div class="content">
        <div id="dateHeader" class="header">{{ singleDayWeather.date }}</div>
        <div class="description">
          <div class="ui equal width stackable horizontalMiddleAlign grid">
            <div class="row">
              <i class="thermometer full icon"></i>
              {{
                $t("CELCIUS_TEMPERATURE", {
                  temp: singleDayWeather.averageWeather.tempMax
                })
              }}
            </div>
            <div class="row">
              <i class="thermometer empty icon"></i>
              {{
                $t("CELCIUS_TEMPERATURE", {
                  temp: singleDayWeather.averageWeather.tempMin
                })
              }}
            </div>
            <div class="row" style="padding-bottom: 1em;">
              <i class="tint icon"></i>
              {{
                $t("HUMIDITY_PERC", {
                  humidity: singleDayWeather.averageWeather.humidity
                })
              }}
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped lang="scss">
#dayMenu {
  flex: none;
  min-height: 20%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0;
}

#dateHeader {
  padding-bottom: 2em;
}

.horizontalMiddleAlign {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

  onDaySelected(selectedDayForecast: SingleDayForecast) {
    this.$emit("daySelected", selectedDayForecast);
  }
}
</script>
