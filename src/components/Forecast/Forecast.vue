<template>
  <div
    id="forecast"
    class="ui bottom attached segment"
    :class="{ loading: isWeatherLoading }"
  >
    <ForecastModeMenu @modeChange="onModeChange" />

    <DailySummary :weather="weather" v-if="mode === 'SUMMARY'" />
    <Hourly :weather="weather" v-show="mode === 'HOURLY'" />
  </div>
</template>

<style scoped lang="scss">
#forecast {
  flex: none;
  min-height: 35%;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SingleDayForecast } from "../../services/WeatherService";
import DailySummary from "./DailySummary.vue";
import Hourly from "@/components/Forecast/Hourly.vue";
import ForecastModeMenu from "@/components/Forecast/ForecastModeMenu.vue";

@Component({
  components: {
    Hourly,
    DailySummary,
    ForecastModeMenu
  }
})
export default class HourlyWeather extends Vue {
  @Prop() private weather: SingleDayForecast;
  @Prop() private isLoading: boolean;

  mode: string = "HOURLY";

  onModeChange(mode: string) {
    this.mode = mode;
  }
}
</script>
