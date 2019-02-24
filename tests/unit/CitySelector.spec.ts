import { shallowMount } from "@vue/test-utils";
// @ts-ignore
import CitySelector from "@/components/CitySelector.vue";

describe("CitySelector.vue", () => {
  it("should render the city list", () => {
    const wrapper = shallowMount(CitySelector, {
      propsData: {
        isLoading: false,
        cities: [
          { id: 1, name: "City1", country: "PL" },
          { id: 2, name: "City2", country: "DL" },
          { id: 3, name: "City3", country: "GB" }
        ]
      },
      mocks: {
        $t: () => {}
      }
    });
    wrapper.find(".ui.fluid.dropdown").trigger("hover");
    expect(wrapper.html()).toContain("City1");
    expect(wrapper.html()).toContain("City2");
    expect(wrapper.html()).toContain("City3");
  });

  it("should render the filtered city list", () => {
    const wrapper = shallowMount(CitySelector, {
      propsData: {
        isLoading: false,
        cities: [
          { id: 1, name: "City1", country: "PL" },
          { id: 2, name: "City2", country: "DL" },
          { id: 3, name: "City3", country: "GB" },
          { id: 4, name: "Zzzz1", country: "GB" },
          { id: 5, name: "Zzzz2", country: "GB" }
        ]
      },
      mocks: {
        $t: () => {}
      }
    });
    wrapper.vm.$data.citySearchTerm = "Zzz";
    wrapper.find(".ui.fluid.dropdown").trigger("hover");
    expect(wrapper.html()).toContain("Zzzz1");
    expect(wrapper.html()).toContain("Zzzz2");
    expect(wrapper.html()).not.toContain("City1");
    expect(wrapper.html()).not.toContain("City2");
    expect(wrapper.html()).not.toContain("City3");
  });

  it("should emit citySelected event on list item selection", () => {
    const wrapper = shallowMount(CitySelector, {
      propsData: {
        isLoading: false,
        cities: [
          { id: 1, name: "City1", country: "PL" },
          { id: 2, name: "City2", country: "DL" },
          { id: 3, name: "City3", country: "GB" }
        ]
      },
      mocks: {
        $t: () => {}
      }
    });
    wrapper
      .findAll(".item")
      .at(0)
      .trigger("click");
    expect(wrapper.emitted().citySelected.length).toEqual(1);
    expect(wrapper.emitted().citySelected[0]).toEqual([
      {
        id: 1,
        name: "City1",
        country: "PL"
      }
    ]);
  });
});
