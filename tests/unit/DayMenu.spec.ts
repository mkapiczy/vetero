import { shallowMount } from "@vue/test-utils";
// @ts-ignore
import DayMenu from "@/components/DayMenu.vue";

const forecastsByDay = [
  {
    averageWeather: {
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
    },
    date: "2019-02-24",
    forecast: [
      {
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
      }
    ]
  },
  {
    averageWeather: {
      date: "2019-02-25",
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
    },
    date: "2019-02-25",
    forecast: [
      {
        date: "2019-02-25",
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
      }
    ]
  }
];

describe("DayMenu.vue", () => {
  it("should emit citySelected event on list item selection", () => {
    const wrapper = shallowMount(DayMenu, {
      propsData: {
        disabled: false,
        forecastsByDay: forecastsByDay,
        forecastForSelectedDay: {}
      },
      mocks: {
        $t: () => {}
      }
    });
    wrapper
      .findAll(".item")
      .at(0)
      .trigger("click");
    expect(wrapper.emitted().daySelected.length).toEqual(1);
    expect(wrapper.emitted().daySelected[0]).toEqual([forecastsByDay[0]]);
  });
});
