<template>
  <div id="currentWeather" class="ui segment" :class="{ loading: isLoading }">
    <div id="weatherCard" class="ui grid stackable">
      <div class="row">
        <div class="sixteen wide middle aligned column">
          <h1>Currently in Warsaw</h1>
          {{ weather.date }}
        </div>
      </div>
      <div class="row">
        <div class="two wide middle aligned column">
          <div class="ui image">
            <img class="ui image" :src="weather.icon" alt="" />
          </div>
        </div>
        <div class="two wide middle aligned column">
          <label id="temperatureLabel" class="ui massive circular label ">
            {{ weather.temp }}&deg;C
          </label>
        </div>
        <div class="ten wide middle aligned column">
          <div class="row">
            {{ weather.weatherType }} -
            {{ weather.weatherDescription }}
          </div>
          <div class="ui four equal width column stackable grid">
            <div class="middle aligned column">
              <div class="row">
                Max temperature: {{ weather.tempMax || "n/a" }}
              </div>
              <div class="row">
                Min temperature: {{ weather.tempMin || "n/a" }}
              </div>
            </div>
            <div class="middle aligned column">
              <div class="row">Rain: {{ weather.rain || "n/a" }}</div>
              <div class="row">Snow: {{ weather.snow || "n/a" }}</div>
            </div>
            <div class="middle aligned column">
              <div class="row">Clouds: {{ weather.clouds || "n/a" }}</div>
              <div class="row">Humidity: {{ weather.humidity || "n/a" }}</div>
            </div>
            <div class="middle aligned column">
              <div class="row">Pressure: {{ weather.pressure || "n/a" }}</div>
              <div class="row">
                Wind:
                {{
                  getWindDirection(weather.wind ? weather.wind.direction : 400)
                }}
                | {{ weather.wind ? weather.wind.speed : "n/a" }}m/s
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
  /*background-color: midnightblue;*/
}

.fullheight {
  min-height: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Weather } from "../services/WeatherService";
@Component
export default class CurrentWeather extends Vue {
  @Prop() private isLoading!: boolean;
  @Prop() private weather: Weather;

  getWindDirection(degrees: number) {
    if (degrees === 0 || degrees === 360) {
      return "N";
    } else if (degrees > 0 && degrees < 90) {
      return "NE";
    } else if (degrees === 90) {
      return "E";
    } else if (degrees > 90 && degrees < 180) {
      return "SE";
    } else if (degrees === 180) {
      return "S";
    } else if (degrees > 180 && degrees < 270) {
      return "SW";
    } else if (degrees === 270) {
      return "W";
    } else if (degrees > 270 && degrees < 360) {
      return "NW";
    } else {
      return "n/a";
    }
  }
}
</script>
