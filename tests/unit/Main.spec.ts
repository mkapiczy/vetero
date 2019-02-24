import { shallowMount } from "@vue/test-utils";
// @ts-ignore
import CitySelector from "@/components/CitySelector.vue";
// @ts-ignore
import DayMenu from "@/components/DayMenu.vue";
// @ts-ignore
import Main from "@/views/Main.vue";

describe("Main.vue", () => {
  it("should receive citySelected event from CitySelector", () => {
    const selectedCity = { id: 1, name: "City", country: "PL" };
    const wrapper = shallowMount(Main);
    wrapper.find(CitySelector).vm.$emit("citySelected", selectedCity);
    expect(wrapper.html()).toContain("City");
    expect(wrapper.vm.$data.selectedCity).toEqual(selectedCity);
  });
  it("should receive daySelected event from DayMenu", () => {
    const selectedDayForecast = {
      date: "2019-02-25",
      forecast: [
        {
          date: "2019-02-25",
          time: "00:00:00",
          temp: -2,
          tempMin: -2,
          tempMax: -2,
          pressure: 1033.54,
          humidity: 88,
          weatherType: "Clear",
          weatherDescription: "clear sky",
          icon: "http://openweathermap.org/img/w/01n.png",
          clouds: 0,
          wind: { direction: 281.501, speed: 4.37 },
          rain: null,
          snow: null
        },
        {
          date: "2019-02-25",
          time: "03:00:00",
          temp: -3,
          tempMin: -3,
          tempMax: -3,
          pressure: 1032.96,
          humidity: 81,
          weatherType: "Clouds",
          weatherDescription: "few clouds",
          icon: "http://openweathermap.org/img/w/02n.png",
          clouds: 20,
          wind: { direction: 284.002, speed: 4.41 },
          rain: null,
          snow: null
        }
      ],
      averageWeather: {
        temp: 0,
        tempMin: -3,
        tempMax: 3,
        humidity: 89.8,
        pressure: 1031.6,
        clouds: 50,
        rain: 0,
        snow: 0,
        wind: { speed: 4.8 }
      }
    };
    const wrapper = shallowMount(Main, {
      mocks: {
        $t: () => {}
      }
    });
    wrapper.find(DayMenu).vm.$emit("daySelected", selectedDayForecast);
    expect(wrapper.vm.$data.forecastForSelectedDay).toEqual(
      selectedDayForecast
    );
  });
});
