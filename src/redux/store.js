import { configureStore } from "@reduxjs/toolkit";
import locationsReducer from "./locationsSlice";
import userMarkerReducer from "./userMarkerSlice";
import fetchedEntitiesReducer from "./fetchedEntitiesSlice";

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    userMarker: userMarkerReducer,
    fetchedEntities: fetchedEntitiesReducer,
  },
});

export default store;
