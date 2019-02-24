<template>
  <div id="main" class="ui flex container">
    <CitySelector
      :cities="cities"
      @citySelected="onCitySelected"
      :isLoading="isCityLoading"
    />
    <CurrentWeather
      :weather="currentWeather"
      :isLoading="isWeatherLoading"
      :currentCity="selectedCity.name"
    />
    <DayMenu
      :forecastsByDay="forecastsByDay"
      :forecastForSelectedDay="forecastForSelectedDay"
      @daySelected="onDaySelected"
      :disabled="isWeatherLoading"
    />
    <Forecast :weather="forecastForSelectedDay" :isLoading="isWeatherLoading" />
  </div>
</template>

<style scoped lang="scss">
#main {
  display: flex;
  padding-top: 15px;
  padding-bottom: 15px;
  flex-direction: column;
  height: 100%;
}
</style>

<script lang="ts">
import _ from "lodash";
import { Component, Vue } from "vue-property-decorator";
import CurrentWeather from "@/components/CurrentWeather.vue"; // @ is an alias to /src
import Forecast from "@/components/Forecast/Forecast.vue"; // @ is an alias to /src
import DayMenu from "@/components/DayMenu.vue"; // @ is an alias to /src
import CitySelector from "@/components/CitySelector.vue"; // @ is an alias to /src
import WeatherService from "../services/WeatherService";
import CityService from "../services/CityService";
import {
  SingleDayForecast,
  Weather,
  Forecast as ForecastType
} from "../services/WeatherService";

import { City } from "../services/CityService";

@Component({
  components: {
    CitySelector,
    CurrentWeather,
    Forecast,
    DayMenu
  }
})
export default class WeatherForecast extends Vue {
  currentWeather: undefined | Weather = {};
  forecastsByDay: undefined | Array<SingleDayForecast> = [];
  forecastForSelectedDay: SingleDayForecast = {};
  isWeatherLoading: boolean = false;
  isCityLoading: boolean = false;
  forecastRetrivalTime: any;
  cities: ReadonlyArray<City> = [];
  selectedCity: City = {};
  defaultCityId: number = 7531926;

  onDaySelected(selectedDayForecast: SingleDayForecast) {
    this.forecastForSelectedDay = selectedDayForecast;
  }

  onCitySelected(city: any) {
    this.isWeatherLoading = true;
    this.selectedCity = city;
    this.getWeatherForecast(city.id).then(() => {
      this.isWeatherLoading = false;
    });
  }

  getWeatherForecast(cityId: number): Promise<ForecastType> {
    this.isWeatherLoading = true;
    return WeatherService.getWeatherForecast(cityId)
      .then(forecast => {
        this.forecastsByDay = forecast.forecastByDay;
        this.currentWeather = forecast.currentWeather;
        this.forecastRetrivalTime = forecast.ts;
        this.forecastForSelectedDay = this.forecastsByDay
          ? this.forecastsByDay[0]
          : {};
        this.isWeatherLoading = false;
        return forecast;
      })
      .catch(err => {
        console.error("Get weather error", err);
        this.isWeatherLoading = false;
        return {};
      });
  }

  getCities(): Promise<ReadonlyArray<City>> {
    this.isCityLoading = true;
    return CityService.getCities().then(cities => {
      this.cities = cities;
      this.selectedCity =
        _.find(this.cities, c => c.id === this.defaultCityId) || {};
      this.isCityLoading = false;
      return cities;
    });
  }

  created() {
    this.getWeatherForecast(this.defaultCityId);
    this.getCities();
  }
}
</script>
