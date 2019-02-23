<template>
  <div
    id="hourly"
    class="ui bottom attached segment"
    :class="{ loading: isLoading }"
  >
    <div class="ui stackable grid">
      <div class="three wide column">
        <div class="ui button" @click="mode = 'SUMMARY'">
          {{ $t("DAILY_SUMMARY") }}
        </div>
      </div>
      <div class="three wide column">
        <div class="ui button" @click="mode = 'HOURLY'">{{ $t("HOURLY") }}</div>
      </div>
      <div class="three wide column">
        <div class="ui button" @click="mode = 'DETAILS'">
          {{ $t("DETAILS") }}
        </div>
      </div>
    </div>

    <DailySummary :weather="weather" v-if="mode === 'SUMMARY'" />
    <div class="ui stackable eight column grid" v-show="mode === 'HOURLY'">
      <div
        class="column"
        v-for="forecast in weather ? weather.forecast : []"
        :key="forecast.time"
      >
        <div class="ui fluid card">
          <div class="content">
            <div class="center floated meta">{{ forecast.time }}</div>
            <img class="ui avatar image" :src="forecast.icon" alt="" />
            {{ forecast.weatherType }}
          </div>
          <div class="image">
            <img />
          </div>
          <div class="content">
            <span class="center floated">
              <i class="temperature high icon"></i>
              {{
                $t("CELCIUS_TEMPERATURE", {
                  temp: forecast.temp
                })
              }}
            </span>
          </div>
          <div class="content">
            <span class="center floated">
              <i class="tint icon"></i>
              {{
                $t("HUMIDITY_PERC", {
                  humidity: forecast.humidity
                })
              }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#hourly {
  flex: none;
  min-height: 35%;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SingleDayForecast } from "@/services/WeatherService";
import DailySummary from "@/components/DailySummary.vue";

@Component({
  components: {
    DailySummary
  }
})
export default class HourlyWeather extends Vue {
  @Prop() private weather: SingleDayForecast;
  @Prop() private isLoading: boolean;

  mode: string = "HOURLY";
}
</script>
