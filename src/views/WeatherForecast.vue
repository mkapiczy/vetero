<template>
  <div id="main" class="ui flex container">
    <!-- TODO Search menu-->
    <MainWeather :weather="selectedDayForecast" :isLoading="isLoading" />
    <DayMenu
      :weatherForecastsByDay="weatherForecastsByDay"
      :selectedDayForecast="selectedDayForecast"
      @onDayChosen="chooseDay"
    />
    <HourlyWeather :weather="selectedDayForecast" />
  </div>
</template>
<style scoped lang="scss">
#main {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#mainWeather {
}
</style>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MainWeather from "@/components/MainWeather.vue"; // @ is an alias to /src
import HourlyWeather from "@/components/HourlyWeather.vue"; // @ is an alias to /src
import DayMenu from "@/components/DayMenu.vue"; // @ is an alias to /src
import WeatherService from "../services/WeatherService";
import { SingleDayForecast } from "../services/WeatherService";
import _ from "lodash";

@Component({
  components: {
    MainWeather,
    HourlyWeather,
    DayMenu
  }
})
export default class WeatherForecast extends Vue {
  weatherForecastsByDay: void | Array<SingleDayForecast> = [];
  selectedDayForecast: null | SingleDayForecast = null;
  isLoading: boolean = true;

  chooseDay(dayWeather: SingleDayForecast) {
    this.selectedDayForecast = dayWeather;
  }
  created() {
    return WeatherService.getWeather("").then(resWeather => {
      this.isLoading = false;
      this.weatherForecastsByDay = resWeather;
    });
  }
  @Watch("weatherForecastsByDay")
  onChanged(value: Array<SingleDayForecast>) {
    if (!_.isEmpty(value)) {
      this.selectedDayForecast = value[0];
    }
  }
}
</script>
