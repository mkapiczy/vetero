<template>
  <div
    id="forecast"
    class="ui bottom attached segment"
    :class="{ loading: isLoading }"
  >
    <ForecastModeMenu @modeChange="onModeChange" />

    <DailySummary :weather="weather" v-if="mode === 'SUMMARY'" />
    <Hourly :weather="weather" v-show="mode === 'HOURLY'" />
    <Details
      :weather="weather ? weather.averageWeather : {}"
      v-show="mode === 'DETAILS'"
    />
  </div>
</template>

<style scoped lang="scss">
#forecast {
  flex: none;
  min-height: 40%;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SingleDayForecast } from "../../services/WeatherService";
import DailySummary from "./DailySummary.vue";
import Hourly from "@/components/Forecast/Hourly.vue";
import Details from "@/components/Forecast/Details.vue";
import ForecastModeMenu from "@/components/Forecast/ForecastModeMenu.vue";

@Component({
  components: {
    Hourly,
    DailySummary,
    Details,
    ForecastModeMenu
  }
})
export default class Forecast extends Vue {
  @Prop() private weather: SingleDayForecast;
  @Prop() private isLoading: boolean;

  mode: string = "HOURLY";

  onModeChange(mode: string) {
    this.mode = mode;
  }
}
</script>
