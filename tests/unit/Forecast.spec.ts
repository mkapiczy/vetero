import { shallowMount } from "@vue/test-utils";
import Forecast from "@/components/Forecast/Forecast.vue";
import ForecastModeMenu from "@/components/Forecast/ForecastModeMenu.vue";
import DailySummary from "@/components/Forecast/DailySummary.vue";
import Hourly from "@/components/Forecast/Hourly.vue";
import Details from "@/components/Forecast/Details.vue";

describe("Forecast.vue", () => {
  it("should call onModeChange when receive modeChanged event from ForecastModeMenu", () => {
    const newMode = "newMode";
    const spy = jest.fn();
    const wrapper = shallowMount(Forecast, {
      methods: {
        onModeChange: spy
      }
    });
    wrapper.find(ForecastModeMenu).vm.$emit("modeChanged", newMode);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(newMode);
  });
  it(
    "should change mode property value when receive modeChanged event from " +
      "ForecastModeMenu",
    () => {
      const newMode = "newMode";
      const spy = jest.fn();
      const wrapper = shallowMount(Forecast);
      wrapper.find(ForecastModeMenu).vm.$emit("modeChanged", newMode);
      expect(wrapper.vm.$data.mode).toEqual(newMode);
    }
  );
  it("should DailySummary component be present when mode === 'SUMMARY'", () => {
    const wrapper = shallowMount(Forecast);
    wrapper.vm.$data.mode = "SUMMARY";
    expect(wrapper.contains(DailySummary)).toEqual(true);
    expect(wrapper.contains(Hourly)).toEqual(false);
    expect(wrapper.contains(Details)).toEqual(false);
  });
  it("should Hourly component be present when mode === 'HOURLY'", () => {
    const wrapper = shallowMount(Forecast);
    wrapper.vm.$data.mode = "HOURLY";
    expect(wrapper.contains(Hourly)).toEqual(true);
    expect(wrapper.contains(DailySummary)).toEqual(false);
    expect(wrapper.contains(Details)).toEqual(false);
  });
  it("should Details component be present when mode === 'DETAILS'", () => {
    const wrapper = shallowMount(Forecast);
    wrapper.vm.$data.mode = "DETAILS";
    expect(wrapper.contains(Details)).toEqual(true);
    expect(wrapper.contains(Hourly)).toEqual(false);
    expect(wrapper.contains(DailySummary)).toEqual(false);
  });
});
