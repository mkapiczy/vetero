<template>
  <div class="ui container">
    <div
      class="ui fluid search selection simple dropdown"
      :class="{ loading: isLoading }"
    >
      <input
        class="search"
        type="text"
        autocomplete="off"
        @input="debouncedGetAutocomplete"
        :placeholder="isLoading ? $t('LOADING_DATA') : $t('SELECT_CITY')"
        v-model.trim="citySearchTerm"
      />

      <i class="dropdown icon"></i>
      <div class="transition menu">
        <div
          class="item"
          v-for="city in filteredCities"
          :key="city.id"
          @click="selectCity(city)"
        >
          {{ city.name }} ({{ city.country }})
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui.fluid.dropdown {
  z-index: 10;
}

.ui.simple.active.dropdown > .menu,
.ui.simple.dropdown:hover > .menu {
  overflow-y: scroll !important;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import fuzzy from "fuzzy";
import { City } from "../services/CityService";
import _ from "lodash";
import CityService from "../services/CityService";
@Component
export default class CitySelector extends Vue {
  isLoading: boolean = false;
  citySearchTerm: any = "";
  maxItems: number = 10;
  debouncedGetAutocomplete: Function = _.debounce(
    this.getCityAutocomplete,
    500
  );
  autocompleteCities: Array<City> = [];

  get filteredCities() {
    const fuzzyFilterOptions = {
      extract: (el: any) => el.name
    };

    return Object.freeze(
      fuzzy
        .filter(
          this.citySearchTerm,
          this.autocompleteCities,
          fuzzyFilterOptions
        )
        .slice(0, this.maxItems)
        .map((item: any) => item.original)
    );
  }

  selectCity(city: City) {
    this.$emit("citySelected", city);
  }

  getCityAutocomplete() {
    this.isLoading = true;
    CityService.getCityAutocomplete(this.citySearchTerm).then(cities => {
      this.autocompleteCities = cities;
      this.isLoading = false;
    });
  }
}
</script>
