import { shallowMount } from "@vue/test-utils";
import CurrentWeather from "@/components/CurrentWeather.vue";

describe("CurrentWeather.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(CurrentWeather, {
      propsData: { isLoading: false, weather: {} }
    });
    expect(wrapper.html()).toContain("Currently");
  });
});
