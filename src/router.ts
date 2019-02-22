import Vue from "vue";
import Router from "vue-router";
import WeatherForecast from "./views/WeatherForecast.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: WeatherForecast
    }
  ]
});
