import { shallowMount } from "@vue/test-utils";
// @ts-ignore
import ForecastModeMenu from "@/components/Forecast/ForecastModeMenu";

describe("ForecastModeMenu.vue", () => {
  it("should emit modeChanged event with 'HOURLY' mode on #hourlyModeButton clicked", () => {
    const wrapper = shallowMount(ForecastModeMenu, {
      mocks: {
        $t: () => {}
      }
    });
    wrapper.find("#hourlyModeButton").trigger("click");
    expect(wrapper.emitted().modeChanged.length).toEqual(1);
    expect(wrapper.emitted().modeChanged[0]).toEqual(["HOURLY"]);
  });
  it("should emit modeChanged event with 'SUMMARY' mode on #summaryModeButton button clicked", () => {
    const wrapper = shallowMount(ForecastModeMenu, {
      mocks: {
        $t: () => {}
      }
    });
    wrapper.find("#summaryModeButton").trigger("click");
    expect(wrapper.emitted().modeChanged.length).toEqual(1);
    expect(wrapper.emitted().modeChanged[0]).toEqual(["SUMMARY"]);
  });
  it("should emit modeChanged event with 'DETAILS' mode on #detailsModeButton button clicked", () => {
    const wrapper = shallowMount(ForecastModeMenu, {
      mocks: {
        $t: () => {}
      }
    });
    wrapper.find("#detailsModeButton").trigger("click");
    expect(wrapper.emitted().modeChanged.length).toEqual(1);
    expect(wrapper.emitted().modeChanged[0]).toEqual(["DETAILS"]);
  });
});
