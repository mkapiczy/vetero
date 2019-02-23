<template>
  <div id="main" class="ui flex container">
    <!-- TODO Search menu-->
    <div id="citySelector" class="ui container">
      <div
        class="ui fluid search selection simple dropdown"
        :class="{ active: focused }"
      >
        <input
          class="search"
          type="text"
          autocomplete="off"
          placeholder="Select City"
          v-model.trim="selectedCity"
        />

        <i class="dropdown icon" @click="focused = !focused"></i>
        <!--<div class="default text">Select Country</div>-->
        <div class="transition menu" :class="{ visible: focused }">
          <div class="item" v-for="city in filteredCities" :key="city">
            {{ city }}
          </div>
        </div>
      </div>
    </div>
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
  padding-top: 15px;
  padding-bottom: 15px;
  flex-direction: column;
  height: 100%;
}

.ui.fluid.dropdown {
  z-index: 10;
}

.ui.simple.active.dropdown > .menu,
.ui.simple.dropdown:hover > .menu {
  overflow-y: scroll !important;
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
import CityService from "../services/CityService";
import { SingleDayForecast, Weather } from "../services/WeatherService";
import fuzzy from "fuzzy";

@Component({
  components: {
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
  cities: Array<any> = [];
  selectedCity: any = "";
  focused: boolean = false;

  get filteredCities() {
    const fuzzyFilterOptions = {
      extract: (el: any) => el.name
    };

    return fuzzy
      .filter(this.selectedCity, this.cities, fuzzyFilterOptions)
      .slice(0, 10)
      .map((item: any) => item.original.name);
  }

  chooseDay(selectedDayForecast: SingleDayForecast) {
    this.forecastForSelectedDay = selectedDayForecast;
  }
  created() {
    WeatherService.getWeatherForecast("").then(forecast => {
      this.forecastsByDay = forecast.forecastByDay;
      this.currentWeather = forecast.currentWeather;
      this.forecastRetrivalTime = forecast.ts;
      this.forecastForSelectedDay = this.forecastsByDay
        ? this.forecastsByDay[0]
        : {};
      this.isLoading = false;
    });

    CityService.getCities().then(cities => {
      this.cities = cities;
    });
  }
}
</script>
