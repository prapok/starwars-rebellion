import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "./locationsSlice";
import userMarkerReducer from "./userMarkerSlice";
import fetchedEntitiesReducer from "./fetchedEntitiesSlice";

describe("Redux Store Configuration", () => {
  it("store should be configured correctly", () => {
    const store = configureStore({
      reducer: {
        locations: locationsReducer,
        userMarker: userMarkerReducer,
        fetchedEntities: fetchedEntitiesReducer,
      },
    });

    // Test that store is correctly configured
    expect(store.getState()).toEqual({
      locations: locationsReducer(undefined, {}),
      userMarker: userMarkerReducer(undefined, {}),
      fetchedEntities: fetchedEntitiesReducer(undefined, {}),
    });
  });
});
