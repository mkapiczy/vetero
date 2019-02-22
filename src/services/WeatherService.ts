import http from "axios";
import _ from "lodash";
import moment from "moment";

const API_URL = process.env.VUE_APP_API_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

export class WeatherForecast {
  date: string;
  time: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
  weatherType: string;
  weatherDescription: string;
  icon: string;
  clouds: number;
  windSpeed: number;
  windDirection: number;
  rain: number;
  snow: number;
}

export class SingleDayForecast {
  date: string;
  mainWeather: WeatherForecast;
  forecast: Array<WeatherForecast>;
}

const getWeather = (
  cityId: string
): Promise<void | Array<SingleDayForecast>> => {
  cityId = "7531926";
  const requestUrl =
    API_URL + "?id=" + cityId + "&units=metric" + "&APPID=" + API_KEY;
  return http
    .get(requestUrl)
    .then(res => {
      return mapResponseToForecast(res.data);
    })
    .catch(err => {
      console.error(err);
      return Promise.reject([]);
    });
};

const mapResponseToForecast = (data: any): Array<SingleDayForecast> => {
  let forecasts: Array<WeatherForecast> = _.map(data.list || [], w =>
    mapToWeatherForecastClass(w)
  );
  return groupForecastsByDay(forecasts);
};

const mapToWeatherForecastClass = (w: any): WeatherForecast => {
  let dateAndTime = w.dt_txt.split(" ");
  return {
    date: dateAndTime[0],
    time: dateAndTime[1],
    temp: w.main.temp,
    tempMin: w.main.temp_min,
    tempMax: w.main.temp_max,
    pressure: w.main.pressure,
    humidity: w.main.humidity,
    weatherType: w.weather[0].main,
    weatherDescription: w.weather[0].description,
    icon: "http://openweathermap.org/img/w/" + w.weather[0].icon + ".png",
    clouds: w.clouds.all,
    windSpeed: w.wind.speed,
    windDirection: w.wind.deg,
    rain: w.rain ? w.rain["3h"] : null,
    snow: w.snow ? w.snow["3h"] : null
  };
};

const groupForecastsByDay = (
  forecasts: Array<WeatherForecast>
): Array<SingleDayForecast> => {
  let forecastsByDay = _.groupBy(forecasts, result =>
    moment(result.date, "YYYY-MM-DD").startOf("day")
  );
  return _.map(forecastsByDay, g => {
    let singleDayForecast = new SingleDayForecast();
    singleDayForecast.date = g[0].date;
    singleDayForecast.mainWeather = g[0];
    singleDayForecast.forecast = g;
    return singleDayForecast;
  });
};
export default {
  SingleDayForecast,
  getWeather
};
