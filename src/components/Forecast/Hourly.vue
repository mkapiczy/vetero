<template>
  <div class="ui stackable eight column grid">
    <div
      class="column"
      v-for="forecast in weather ? weather.forecast : []"
      :key="forecast.time"
    >
      <div class="ui fluid card">
        <div class="content">
          <div class="center floated meta">{{ forecast.time }}</div>
          <img class="ui avatar image" :src="forecast.icon" alt="" />
          {{ forecast.weatherType }}
        </div>
        <div class="image">
          <img />
        </div>
        <div class="content">
          <span class="center floated">
            <i class="temperature high icon"></i>
            {{
              $t("CELCIUS_TEMPERATURE", {
                temp: forecast.temp
              })
            }}
          </span>
        </div>
        <div class="content">
          <span class="center floated">
            <i class="tint icon"></i>
            {{
              $t("HUMIDITY_PERC", {
                humidity: forecast.humidity
              })
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SingleDayForecast } from "../../services/WeatherService";

@Component
export default class HourlyWeather extends Vue {
  @Prop() private weather: SingleDayForecast;
}
</script>
