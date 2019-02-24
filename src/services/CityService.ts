import http from "axios";
import _ from "lodash";

export class City {
  id?: number;
  name?: string;
  country?: string;
}

/**
 * Reads a list of cities in the world
 * @function
 * @memberof CityService
 *
 * @return { Promise<ReadonlyArray<City>> } Readonly array of cities.
 * Readonly to tell vue that it does not need to observe the value reactively (rendering improvement for big arrays)
 */
const getCities = (): Promise<ReadonlyArray<City>> => {
  return http.get("./city.list.json").then(resp => {
    return Object.freeze(
      _.map(_.filter(resp.data, c => !_.isEmpty(c.name)), c => {
        delete c.coord;
        return c;
      })
    );
  });
};

/**
 * City service: A service for managing cities data.
 * @module CityService
 * @namespace CityService
 * @version 1.0.0
 */
export default {
  getCities
};
