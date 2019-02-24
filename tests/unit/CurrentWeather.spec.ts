import { shallowMount } from "@vue/test-utils";
import CurrentWeather from "@/components/CurrentWeather.vue";

describe("CurrentWeather.vue", () => {
  it("should render CurrentWeather component", () => {
    const wrapper = shallowMount(CurrentWeather, {
      propsData: { isLoading: false, weather: {} },
      mocks: {
        $t: () => {}
      }
    });
    expect(wrapper.html()).toContain("currentWeather");
  });
});
