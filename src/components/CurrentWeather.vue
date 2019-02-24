<template>
  <div id="currentWeather" class="ui segment" :class="{ loading: isLoading }">
    <div id="weatherCard" class="ui grid stackable">
      <div class="row">
        <div class="sixteen wide middle aligned column">
          {{ weather.date }}
          <h1>{{ $t("WEATHER_IN", { city: currentCity }) }}</h1>
          {{ weather.weatherType }} -
          {{ weather.weatherDescription }}
        </div>
      </div>
      <div class="row">
        <div class="two wide middle aligned column">
          <div class="ui image">
            <img class="ui image" :src="weather.icon" alt="" />
          </div>
        </div>
        <div class="two wide middle aligned column">
          <label id="temperatureLabel" class="ui massive circular blue label ">
            {{ $t("CELCIUS_TEMPERATURE", { temp: weather.temp }) }}
          </label>
        </div>
        <div class="ten wide middle aligned column">
          <div class="ui four equal width column stackable grid">
            <div class="middle aligned column">
              <div class="row">
                {{ $t("MAX_TEMPERATURE") }}
                <span v-if="weather.tempMax">
                  {{ $t("CELCIUS_TEMPERATURE", { temp: weather.tempMax }) }}
                </span>
                <span v-else>
                  {{ $t("N/A") }}
                </span>
              </div>
              <div class="row">
                {{ $t("MIN_TEMPERATURE") }}
                <span v-if="weather.tempMin">
                  {{ $t("CELCIUS_TEMPERATURE", { temp: weather.tempMin }) }}
                </span>
                <span v-else>
                  {{ $t("N/A") }}
                </span>
              </div>
            </div>
            <div class="middle aligned column">
              <div class="row">
                {{ $t("RAIN") }}: {{ weather.rain || "n/a" }}
              </div>
              <div class="row">
                {{ $t("SNOW") }}: {{ weather.snow || "n/a" }}
              </div>
            </div>
            <div class="middle aligned column">
              <div class="row">
                {{ $t("CLOUDS") }}: {{ weather.clouds || "n/a" }}
              </div>
              <div class="row">
                {{ $t("HUMIDITY") }}: {{ weather.humidity || "n/a" }}
              </div>
            </div>
            <div class="middle aligned column">
              <div class="row">
                {{ $t("PRESSURE") }}: {{ weather.pressure || "n/a" }}
              </div>
              <div class="row">
                {{ $t("WIND") }}:
                <span v-if="weather.wind && weather.wind.speed">
                  {{ weather.wind.speed }}{{ $t("METERS_PER_SECOND") }}
                </span>
                <span v-else>
                  {{ $t("N/A") }}
                </span>
                <span v-if="weather.wind && weather.wind.direction">
                  {{ getWindDirection(weather.wind.direction) }}
                </span>
                <span v-else>
                  {{ $t("N/A") }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#currentWeather {
  flex: auto;
}
#weatherCard {
  min-height: 100%;
}

.vertical-aligned {
  display: flex;
  justify-content: center;
  align-items: center;
}

#temperatureLabel {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fullheight {
  min-height: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Weather } from "../services/WeatherService";
import WeatherService from "../services/WeatherService";
@Component
export default class CurrentWeather extends Vue {
  @Prop() private isLoading!: boolean;
  @Prop() private weather: Weather;
  @Prop() private currentCity: string;

  getWindDirection(degrees: number): string {
    return WeatherService.getWindDirection(degrees);
  }
}
</script>
