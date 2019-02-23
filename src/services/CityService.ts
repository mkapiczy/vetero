import http from "axios";

const getCities = (): Promise<any> => {
  return http.get("./city.list.json").then(resp => {
    return resp.data.slice(0, 5000);
  });
};
export default {
  getCities
};
