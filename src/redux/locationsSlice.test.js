import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios"; // Mocking axios
import {
  fetchLocations,
  setDecodedLocations,
  locationsSlice,
  selectDecodedLocations,
} from "./locationsSlice";

// Mock axios get function
jest.mock("axios");

const mockStore = configureMockStore([thunk]);

describe("locationsSlice", () => {
  const initialState = {
    decodedLocations: [],
  };

  it("setDecodedLocations should update state correctly", () => {
    const nextState = locationsSlice.reducer(initialState, {
      type: setDecodedLocations.type,
      payload: [{ name: "Location 1" }],
    });

    // Check if the state has been updated correctly
    expect(nextState.decodedLocations).toEqual([{ name: "Location 1" }]);
  });

  it("fetchLocations should dispatch setDecodedLocations correctly", async () => {
    // Mock axios response
    axios.get.mockResolvedValue({
      data: { message: btoa(JSON.stringify([{ name: "Location 2" }])) },
    });

    const store = mockStore(initialState);

    // Dispatch fetchLocations
    await store.dispatch(fetchLocations());

    const actions = store.getActions();
    expect(actions[0]).toEqual(setDecodedLocations([{ name: "Location 2" }]));
  });

  it("selectDecodedLocations should return decodedLocations", () => {
    const mockState = {
      locations: { decodedLocations: [{ name: "Location 3" }] },
    };
    const result = selectDecodedLocations(mockState);

    // Check if selectDecodedLocations returns decodedLocations
    expect(result).toEqual([{ name: "Location 3" }]);
  });
});
