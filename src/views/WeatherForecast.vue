<template>
  <div id="main" class="ui flex container">
    <!-- TODO Search menu-->
    <CurrentWeather :weather="currentWeather" :isLoading="isLoading" />
    <DayMenu
      :forecastsByDay="forecastsByDay"
      :forecastForSelectedDay="forecastForSelectedDay"
      @onDayChosen="chooseDay"
    />
    <HourlyWeather :weather="forecastForSelectedDay" :isLoading="isLoading" />
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
import { Component, Vue } from "vue-property-decorator";
import CurrentWeather from "@/components/CurrentWeather.vue"; // @ is an alias to /src
import HourlyWeather from "@/components/HourlyWeather.vue"; // @ is an alias to /src
import DayMenu from "@/components/DayMenu.vue"; // @ is an alias to /src
import WeatherService from "../services/WeatherService";
import { SingleDayForecast, Weather } from "../services/WeatherService";

@Component({
  components: {
    CurrentWeather,
    HourlyWeather,
    DayMenu
  }
})
export default class WeatherForecast extends Vue {
  currentWeather: Weather = {};
  forecastsByDay: Array<SingleDayForecast> = [];
  forecastForSelectedDay: SingleDayForecast = {};
  isLoading: boolean = true;
  forecastRetrivalTime: null | Date = null;

  chooseDay(selectedDayForecast: SingleDayForecast) {
    this.forecastForSelectedDay = selectedDayForecast;
  }
  created() {
    return WeatherService.getWeatherForecast("").then(forecast => {
      this.forecastsByDay = forecast.forecastByDay;
      this.currentWeather = forecast.currentWeather;
      this.forecastRetrivalTime = forecast.ts;
      this.forecastForSelectedDay = this.forecastsByDay[0];
      this.isLoading = false;
    });
  }
}
</script>
