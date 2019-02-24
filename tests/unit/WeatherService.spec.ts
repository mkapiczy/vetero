import WeatherService from "@/services/WeatherService";
import http from "axios";
import { fakePromise } from "../util";

describe("WeatherService", () => {
  describe("getWeatherForecast", () => {
    it("should get 5 day weather forecast", () => {
      const cityId = 1851632;
      const res = {
        data: {
          city: {
            id: cityId,
            name: "Shuzenji",
            coord: { lon: 138.933334, lat: 34.966671 },
            country: "JP"
          },
          cod: "200",
          message: 0.0045,
          cnt: 38,
          list: [
            {
              dt: 1551031200,
              main: {
                temp: 1.45,
                temp_min: -0.21,
                temp_max: 1.45,
                pressure: 1034.59,
                sea_level: 1034.59,
                grnd_level: 1021.84,
                humidity: 84,
                temp_kf: 1.65
              },
              weather: [
                {
                  id: 801,
                  main: "Clouds",
                  description: "few clouds",
                  icon: "02n"
                }
              ],
              clouds: { all: 12 },
              wind: { speed: 3.65, deg: 282.001 },
              sys: { pod: "n" },
              dt_txt: "2019-02-24 18:00:00"
            },
            {
              dt: 1551052800,
              main: {
                temp: -1.68,
                temp_min: -2.24,
                temp_max: -1.68,
                pressure: 1033.54,
                sea_level: 1033.54,
                grnd_level: 1020.69,
                humidity: 88,
                temp_kf: 0.55
              },
              weather: [
                {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01n"
                }
              ],
              clouds: { all: 0 },
              wind: { speed: 4.37, deg: 281.501 },
              sys: { pod: "n" },
              dt_txt: "2019-02-25 00:00:00"
            },
            {
              dt: 1551074400,
              main: {
                temp: -2.83,
                temp_min: -2.83,
                temp_max: -2.83,
                pressure: 1032.83,
                sea_level: 1032.83,
                grnd_level: 1019.95,
                humidity: 92,
                temp_kf: 0
              },
              weather: [
                {
                  id: 804,
                  main: "Clouds",
                  description: "overcast clouds",
                  icon: "04d"
                }
              ],
              clouds: { all: 88 },
              wind: { speed: 4.66, deg: 286.506 },
              sys: { pod: "d" },
              dt_txt: "2019-02-26 06:00:00"
            },
            {
              dt: 1551031200,
              main: {
                temp: 1.45,
                temp_min: -0.21,
                temp_max: 1.45,
                pressure: 1034.59,
                sea_level: 1034.59,
                grnd_level: 1021.84,
                humidity: 84,
                temp_kf: 1.65
              },
              weather: [
                {
                  id: 801,
                  main: "Clouds",
                  description: "few clouds",
                  icon: "02n"
                }
              ],
              clouds: { all: 12 },
              wind: { speed: 3.65, deg: 282.001 },
              sys: { pod: "n" },
              dt_txt: "2019-02-27 18:00:00"
            },
            {
              dt: 1551031200,
              main: {
                temp: 1.45,
                temp_min: -0.21,
                temp_max: 1.45,
                pressure: 1034.59,
                sea_level: 1034.59,
                grnd_level: 1021.84,
                humidity: 84,
                temp_kf: 1.65
              },
              weather: [
                {
                  id: 801,
                  main: "Clouds",
                  description: "few clouds",
                  icon: "02n"
                }
              ],
              clouds: { all: 12 },
              wind: { speed: 3.65, deg: 282.001 },
              sys: { pod: "n" },
              dt_txt: "2019-02-28 18:00:00"
            }
          ]
        }
      };
      const getStub = jest
        .spyOn(http, "get")
        .mockImplementation(url => fakePromise(res));

      const expectedCurrentWeather = {
        date: "2019-02-24",
        time: "18:00:00",
        temp: 1,
        tempMin: -0,
        tempMax: 1,
        pressure: 1034.59,
        humidity: 84,
        weatherType: "Clouds",
        weatherDescription: "few clouds",
        icon: "http://openweathermap.org/img/w/02n.png",
        clouds: 12,
        wind: { direction: 282.001, speed: 3.65 },
        rain: null,
        snow: null
      };
      return WeatherService.getWeatherForecast(cityId).then(forecast => {
        expect(getStub).toBeCalledTimes(1);
        expect(forecast.forecastByDay && forecast.forecastByDay.length).toEqual(
          5
        );
        expect(forecast.currentWeather).toEqual(expectedCurrentWeather);
        expect(forecast.cityId).toEqual(cityId);
      });
    });
    it("should return empty object when http response has no data", () => {
      const cityId = 1851632;
      const res = {};
      const getStub = jest
        .spyOn(http, "get")
        .mockImplementation(() => fakePromise(res));

      return WeatherService.getWeatherForecast(cityId).then(forecast => {
        expect(getStub).toBeCalledTimes(1);
        expect(forecast).toEqual({});
      });
    });
  });

  describe("getWindDirection", () => {
    it("should return N", () => {
      expect(WeatherService.getWindDirection(0)).toEqual("N");
      expect(WeatherService.getWindDirection(360)).toEqual("N");
    });
    it("should return NE", () => {
      expect(WeatherService.getWindDirection(1)).toEqual("NE");
      expect(WeatherService.getWindDirection(45)).toEqual("NE");
      expect(WeatherService.getWindDirection(89)).toEqual("NE");
    });
    it("should return E", () => {
      expect(WeatherService.getWindDirection(90)).toEqual("E");
    });
    it("should return SE", () => {
      expect(WeatherService.getWindDirection(91)).toEqual("SE");
      expect(WeatherService.getWindDirection(135)).toEqual("SE");
      expect(WeatherService.getWindDirection(179)).toEqual("SE");
    });
    it("should return S", () => {
      expect(WeatherService.getWindDirection(180)).toEqual("S");
    });
    it("should return SW", () => {
      expect(WeatherService.getWindDirection(181)).toEqual("SW");
      expect(WeatherService.getWindDirection(225)).toEqual("SW");
      expect(WeatherService.getWindDirection(269)).toEqual("SW");
    });
    it("should return W", () => {
      expect(WeatherService.getWindDirection(270)).toEqual("W");
    });
    it("should return NW", () => {
      expect(WeatherService.getWindDirection(271)).toEqual("NW");
      expect(WeatherService.getWindDirection(315)).toEqual("NW");
      expect(WeatherService.getWindDirection(359)).toEqual("NW");
    });
  });
});
