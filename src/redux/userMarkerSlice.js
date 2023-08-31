import { createSlice } from "@reduxjs/toolkit";

const userMarkerSlice = createSlice({
  name: "userMarker",
  initialState: { lat: 0, long: 0 },
  reducers: {
    setUserMarker: (state, action) => {
      state.lat = action.payload.lat;
      state.long = action.payload.long;
    },
  },
});

export const { setUserMarker } = userMarkerSlice.actions;
export default userMarkerSlice.reducer;
