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
import CurrentWeather from "@/components/CurrentWeather.vue";
import Forecast from "@/components/Forecast/Forecast.vue";
import DayMenu from "@/components/DayMenu.vue";
import CitySelector from "@/components/CitySelector.vue";
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
export default class Main extends Vue {
  currentWeather: undefined | Weather = {};
  forecastsByDay: undefined | Array<SingleDayForecast> = [];
  forecastForSelectedDay: SingleDayForecast = {};
  isWeatherLoading: boolean = false;
  isCityLoading: boolean = false;
  cities: ReadonlyArray<City> = [];
  // TODO -  Hardcoded for now - default user location to be determined using location from the browser or initialy show page without a forecast
  selectedCity: City = {
    id: 7531926,
    name: "Warszawa",
    country: "PL"
  };

  onDaySelected(selectedDayForecast: SingleDayForecast) {
    this.forecastForSelectedDay = selectedDayForecast;
  }

  onCitySelected(city: any) {
    this.selectedCity = city;
    return this.getWeatherForecast(city.id);
  }

  getWeatherForecast(cityId: number): Promise<ForecastType> {
    this.isWeatherLoading = true;
    return WeatherService.getWeatherForecast(cityId)
      .then(forecast => {
        this.forecastsByDay = forecast.forecastByDay;
        this.currentWeather = forecast.currentWeather;
        this.forecastForSelectedDay = this.forecastsByDay
          ? this.forecastsByDay[0]
          : {};
        this.isWeatherLoading = false;
        return forecast;
      })
      .catch(err => {
        console.error("Error while getting weather forecast", err);
        this.isWeatherLoading = false;
        return {};
      });
  }

  getCities(): Promise<ReadonlyArray<City>> {
    this.isCityLoading = true;
    return CityService.getCities()
      .then(cities => {
        this.cities = cities;
        this.selectedCity =
          _.find(this.cities, c => c.id === this.selectedCity.id) || {};
        this.isCityLoading = false;
        return cities;
      })
      .catch(() => {
        this.isCityLoading = false;
        return [];
      });
  }

  created() {
    if (this.selectedCity && this.selectedCity.id)
      this.getWeatherForecast(this.selectedCity.id);
    this.getCities();
  }
}
</script>
