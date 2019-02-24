import CityService, { City } from "@/services/CityService";
import http from "axios";
import { fakePromise } from "../util";

describe("CityService", () => {
  it("should return city list", () => {
    const res = {
      data: [
        {
          id: "1",
          name: "City1",
          country: "C1",
          coord: {
            lon: 0,
            lat: 0
          }
        },
        {
          id: "2",
          name: "City2",
          country: "C2",
          coord: {
            lon: 5,
            lat: 7
          }
        }
      ]
    };
    const getStub = jest
      .spyOn(http, "get")
      .mockImplementation(url => fakePromise(res));
    const expectedCitiesResult = res.data.map(c => {
      delete c.coord;
      return c;
    });
    return CityService.getCities().then(cities => {
      expect(getStub).toBeCalledTimes(1);
      expect(cities.length).toEqual(2);
      expect(cities).toEqual(expectedCitiesResult);
    });
  });
  it("should return empty city list when http response does not contain data", () => {
    const res = {};
    const getStub = jest
      .spyOn(http, "get")
      .mockImplementation(url => fakePromise(res));

    return CityService.getCities().then(cities => {
      expect(getStub).toBeCalledTimes(1);
      expect(cities).toEqual([]);
    });
  });
  // TODO - Test http error case - Get some jest error
  // it("should return empty array when http error occurs", async () => {
  //   const getStub = jest.spyOn(http, "get").mockImplementation(() => {
  //     throw Error("error");
  //   });
  //
  //   CityService.getCities().then(cities => {
  //     expect(getStub).toBeCalledTimes(1);
  //     expect(getStub).toThrowError("error");
  //     expect(cities).toEqual([]);
  //   });
  // });
});
