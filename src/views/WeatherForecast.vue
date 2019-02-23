<template>
  <div id="main" class="ui flex container">
    <CitySelector
      :cities="cities"
      @citySelected="onCitySelected"
      :disabled="isLoading"
    />
    <CurrentWeather
      :weather="currentWeather"
      :isLoading="isLoading"
      :currentCity="selectedCity.name"
    />
    <DayMenu
      :forecastsByDay="forecastsByDay"
      :forecastForSelectedDay="forecastForSelectedDay"
      @daySelected="onDaySelected"
      :disabled="isLoading"
    />
    <HourlyWeather :weather="forecastForSelectedDay" :isLoading="isLoading" />
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
import HourlyWeather from "@/components/HourlyWeather.vue"; // @ is an alias to /src
import DayMenu from "@/components/DayMenu.vue"; // @ is an alias to /src
import CitySelector from "@/components/CitySelector.vue"; // @ is an alias to /src
import WeatherService from "../services/WeatherService";
import CityService from "../services/CityService";
import {
  SingleDayForecast,
  Weather,
  Forecast
} from "../services/WeatherService";

import { City } from "../services/CityService";

@Component({
  components: {
    CitySelector,
    CurrentWeather,
    HourlyWeather,
    DayMenu
  }
})
export default class WeatherForecast extends Vue {
  currentWeather: undefined | Weather = {};
  forecastsByDay: undefined | Array<SingleDayForecast> = [];
  forecastForSelectedDay: SingleDayForecast = {};
  isLoading: boolean = true;
  forecastRetrivalTime: any;
  cities: ReadonlyArray<City> = [];
  selectedCity: City = {};
  defaultCityId: number = 7531926;

  onDaySelected(selectedDayForecast: SingleDayForecast) {
    this.forecastForSelectedDay = selectedDayForecast;
  }

  onCitySelected(city: any) {
    this.isLoading = true;
    this.selectedCity = city;
    this.getWeatherForecast(city.id).then(() => {
      this.isLoading = false;
    });
  }

  getWeatherForecast(cityId: number): Promise<Forecast> {
    return WeatherService.getWeatherForecast(cityId)
      .then(forecast => {
        this.forecastsByDay = forecast.forecastByDay;
        this.currentWeather = forecast.currentWeather;
        this.forecastRetrivalTime = forecast.ts;
        this.forecastForSelectedDay = this.forecastsByDay
          ? this.forecastsByDay[0]
          : {};
        return forecast;
      })
      .catch(err => {
        console.error("Get weather error", err);
        return {};
      });
  }

  getCities(): Promise<ReadonlyArray<City>> {
    return CityService.getCities().then(cities => {
      this.cities = cities;
      this.selectedCity =
        _.find(this.cities, c => c.id === this.defaultCityId) || {};
      return cities;
    });
  }

  created() {
    this.isLoading = true;
    const promises: [Promise<Forecast>, Promise<ReadonlyArray<City>>] = [
      this.getWeatherForecast(this.defaultCityId),
      this.getCities()
    ];
    return Promise.all(promises)
      .then(() => {
        this.isLoading = false;
      })
      .catch(err => {
        console.error(err);
        this.isLoading = false;
      });
  }
}
</script>
