<template>
  <div class="ui four equal width column stackable grid">
    <div class="middle aligned column">
      <div class="row">
        {{ $t("MEAN_TEMPERATURE") }}
        <span v-if="weather.tempMax">
          {{ $t("CELCIUS_TEMPERATURE", { temp: weather.temp }) }}
        </span>
        <span v-else>
          {{ $t("N/A") }}
        </span>
      </div>
    </div>
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
      <div class="row">{{ $t("RAIN") }}: {{ weather.rain || "n/a" }}</div>
      <div class="row">{{ $t("SNOW") }}: {{ weather.snow || "n/a" }}</div>
    </div>
    <div class="middle aligned column">
      <div class="row">{{ $t("CLOUDS") }}: {{ weather.clouds || "n/a" }}</div>
      <div class="row">
        {{ $t("HUMIDITY") }}: {{ weather.humidity || "n/a" }}
      </div>
    </div>
    <div class="middle aligned column">
      <div class="row">
        {{ $t("PRESSURE") }}: {{ weather.pressure || "n/a" }}
      </div>
      <div class="row">
        {{ $t("WIND") }}: {{ weather.wind ? weather.wind.speed : "n/a" }}m/s
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Weather } from "../../services/WeatherService";

@Component
export default class Details extends Vue {
  @Prop() private weather: Weather;
}
</script>
