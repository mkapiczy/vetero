import http from "axios";
import _ from "lodash";

export class City {
  id?: number;
  name?: string;
  country?: string;
}
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
export default {
  getCities
};
