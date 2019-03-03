import http from "axios";

const CITY_AUTOCOMPLETE_URL = process.env.VUE_APP_CITY_AUTOCOMPLETE_URL;

export class City {
  id?: number;
  name?: string;
  country?: string;
}

/**
 * Reads a list of cities in the world by name.
 * @function
 * @memberof CityService
 *
 * @return { Promise<Array<City>> } Array of cities.
 */
const getCityAutocomplete = (searchString: string): Promise<Array<City>> => {
  return http
    .get(`${CITY_AUTOCOMPLETE_URL}?searchString=${searchString}`)
    .then(cities => cities.data.cities)
    .catch(err => {
      console.error(err);
      return [];
    });
};

/**
 * City service: A service for managing cities data.
 * @module CityService
 * @namespace CityService
 * @version 1.0.0
 */
export default {
  getCityAutocomplete
};
