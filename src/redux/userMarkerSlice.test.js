import userMarkerReducer, { setUserMarker } from "./userMarkerSlice";

describe("userMarkerSlice", () => {
  it("should return the initial state", () => {
    const initialState = { lat: 0, long: 0 };
    const nextState = userMarkerReducer(undefined, {});
    expect(nextState).toEqual(initialState);
  });

  it("should handle setUserMarker", () => {
    const initialState = { lat: 0, long: 0 };
    const payload = { lat: 10, long: 20 };
    const nextState = userMarkerReducer(initialState, setUserMarker(payload));
    const expectedState = { lat: 10, long: 20 };
    expect(nextState).toEqual(expectedState);
  });
});
