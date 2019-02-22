import http from "axios";
import _ from "lodash";
import moment from "moment";
import * as math from "mathjs";

const API_URL = process.env.VUE_APP_API_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

export class Weather {
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
  wind: Wind;
  rain: number;
  snow: number;
}

export class Wind {
  direction: number;
  speed: number;
}

export class AverageWeather {
  tempMin: number;
  tempMax: number;
  tempAvg: number;
  humidity: number;
}

export class SingleDayForecast {
  date: string;
  averageWeather: AverageWeather;
  forecast: Array<Weather>;
}

export class Forecast {
  ts: Date;
  currentWeather: Weather;
  forecastByDay: Array<SingleDayForecast>;
}

const getWeatherForecast = (cityId: string): Promise<Forecast> => {
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

const mapResponseToForecast = (data: any): Forecast => {
  let weatherList: Array<Weather> = _.map(data.list || [], w =>
    mapToWeatherClass(w)
  );
  let forecast = new Forecast();
  forecast.ts = new Date();
  forecast.forecastByDay = groupForecastsByDay(weatherList);
  forecast.currentWeather = getCurrentWeather(forecast.forecastByDay[0]);
  return forecast;
};

const mapToWeatherClass = (w: any): Weather => {
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
    wind: {
      direction: w.wind.deg,
      speed: w.wind.speed
    },
    rain: w.rain ? w.rain["3h"] : null,
    snow: w.snow ? w.snow["3h"] : null
  };
};

const groupForecastsByDay = (
  forecasts: Array<Weather>
): Array<SingleDayForecast> => {
  let forecastsByDay = _.groupBy(forecasts, result =>
    moment(result.date, "YYYY-MM-DD").startOf("day")
  );
  return _.map(forecastsByDay, f => {
    let singleDayForecast = new SingleDayForecast();
    singleDayForecast.date = f[0].date;
    singleDayForecast.forecast = f;
    singleDayForecast.averageWeather = getAverageWeatherForDay(f);
    return singleDayForecast;
  });
};

const getAverageWeatherForDay = (
  dailyForecast: Array<Weather>
): AverageWeather => {
  return {
    tempMin: math.min(dailyForecast.map((f: Weather) => f.tempMin)),
    tempMax: math.max(dailyForecast.map((f: Weather) => f.tempMax)),
    tempAvg: math.mean(dailyForecast.map((f: Weather) => f.temp)),
    humidity: math.mean(dailyForecast.map((f: Weather) => f.humidity))
  };
};

const getCurrentWeather = (currentDayForecast: SingleDayForecast): Weather => {
  return currentDayForecast.forecast[0];
};
export default {
  SingleDayForecast,
  Forecast,
  getWeatherForecast
};
