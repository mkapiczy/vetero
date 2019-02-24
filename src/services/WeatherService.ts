import http from "axios";
import _ from "lodash";
import moment from "moment";
import * as math from "mathjs";

const API_URL = process.env.VUE_APP_API_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

export class Forecast {
  ts?: Date;
  cityId?: number;
  currentWeather?: Weather;
  forecastByDay?: Array<SingleDayForecast>;
}

export class SingleDayForecast {
  date?: string;
  averageWeather?: Weather;
  forecast?: Array<Weather>;
}

export class Weather {
  date?: string;
  time?: string;
  temp?: number;
  tempMin?: number;
  tempMax?: number;
  pressure?: number;
  humidity?: number;
  weatherType?: string;
  weatherDescription?: string;
  icon?: string;
  clouds?: number;
  wind?: Wind;
  rain?: number;
  snow?: number;
}

export class Wind {
  direction?: number;
  speed?: number;
}

/**
 * Gets weather forecast.
 * @function
 * @memberof WeatherService
 *
 * @return { Promise<Forecast> }
 */
const getWeatherForecast = (cityId: number): Promise<Forecast> => {
  const requestUrl = `${API_URL}?id=${cityId}&units=metric&APPID=${API_KEY}`;
  return http
    .get(requestUrl)
    .then(res => {
      if (res && res.data) {
        return mapResponseToForecast(res.data, cityId);
      }
      return {};
    })
    .catch(err => {
      console.error("Error in getWeatherForecast", err);
      return {};
    });
};

/**
 * Maps Openweather API response to the Forecast class object.
 * @function
 * @memberof WeatherService
 *
 * @return { Promise<Forecast> }
 */
const mapResponseToForecast = (data: any, cityId: number): Forecast => {
  let weatherList: Array<Weather> = _.map(data.list || [], w =>
    mapToWeatherClass(w)
  );
  let forecast = new Forecast();
  forecast.ts = new Date();
  forecast.cityId = cityId;
  forecast.forecastByDay = groupWeathersByDay(weatherList);
  forecast.currentWeather = getCurrentWeather(forecast.forecastByDay[0]);
  return forecast;
};

/**
 * Maps single element from the Openweather API response to the Weather class object.
 * @function
 * @memberof WeatherService
 *
 * @return { Weather }
 */
const mapToWeatherClass = (w: any): Weather => {
  let dateAndTime = w.dt_txt.split(" ");
  return {
    date: dateAndTime[0],
    time: dateAndTime[1],
    temp: Math.round(w.main.temp),
    tempMin: Math.round(w.main.temp_min),
    tempMax: Math.round(w.main.temp_max),
    pressure: w.main.pressure,
    humidity: _.round(w.main.humidity, 1),
    weatherType: w.weather ? w.weather[0].main : "",
    weatherDescription: w.weather ? w.weather[0].description : "",
    icon: "http://openweathermap.org/img/w/" + w.weather[0].icon + ".png",
    clouds: w.clouds ? w.clouds.all : null,
    wind: {
      direction: w.wind ? w.wind.deg : null,
      speed: w.wind ? w.wind.speed : null
    },
    rain: w.rain ? w.rain["3h"] : null,
    snow: w.snow ? w.snow["3h"] : null
  };
};

/**
 * Groups weather elements by day.
 * @function
 * @memberof WeatherService
 *
 * @return { Array<SingleDayForecast> }
 */
const groupWeathersByDay = (
  weathers: Array<Weather>
): Array<SingleDayForecast> => {
  let forecastsByDay = _.groupBy(weathers, result =>
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

/**
 * Gets an average weather from daily forecast by providing mean, max and minimum values of conditions.
 * @function
 * @memberof WeatherService
 *
 * @return { Weather }
 */
const getAverageWeatherForDay = (dailyForecast: Array<Weather>): Weather => {
  return {
    temp: Math.round(math.mean(dailyForecast.map((f: Weather) => f.temp || 0))),
    tempMin: math.min(dailyForecast.map((f: Weather) => f.tempMin || 0)),
    tempMax: math.max(dailyForecast.map((f: Weather) => f.tempMax || 0)),
    humidity: _.round(
      math.mean(dailyForecast.map((f: Weather) => f.humidity || 0)),
      1
    ),
    pressure: _.round(
      math.mean(dailyForecast.map((f: Weather) => f.pressure || 0)),
      1
    ),
    clouds: _.round(
      math.mean(dailyForecast.map((f: Weather) => f.clouds || 0)),
      1
    ),
    rain: _.round(math.mean(dailyForecast.map((f: Weather) => f.rain || 0)), 1),
    snow: _.round(math.mean(dailyForecast.map((f: Weather) => f.snow || 0)), 1),
    wind: {
      direction: undefined,
      speed: _.round(
        math.mean(
          dailyForecast.map((f: Weather) => (f.wind ? f.wind.speed || 0 : 0))
        ),
        1
      )
    }
  };
};

/**
 * Gets a current weather.
 *
 * @function
 * @memberof WeatherService
 *
 * @return { Weather }
 */
const getCurrentWeather = (currentDayForecast: SingleDayForecast): Weather => {
  return currentDayForecast && currentDayForecast.forecast
    ? currentDayForecast.forecast[0]
    : {};
};

/**
 * Gets string representation of wind direction based on the degrees value.
 * @function
 * @memberof WeatherService
 *
 * @return { string } String representation of the direction.
 */
const getWindDirection = (degrees: number): string => {
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
};

/**
 * Weather service: A service for weather related functionalities.
 * @module WeatherService
 * @namespace WeatherService
 * @version 1.0.0
 */
export default {
  SingleDayForecast,
  Forecast,
  getWeatherForecast,
  getWindDirection
};
