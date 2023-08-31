import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  decodedLocations: [],
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setDecodedLocations: (state, action) => {
      state.decodedLocations = action.payload;
    },
  },
});

export const { setDecodedLocations } = locationsSlice.actions;

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(
        "https://aseevia.github.io/star-wars-frontend/data/secret.json"
      );
      const data = response.data;
      const decodedMessage = atob(data.message);
      const parsedData = JSON.parse(decodedMessage);
      dispatch(setDecodedLocations(parsedData)); // Dispatching the action here
    } catch (error) {
      console.error("Error fetching JSON:", error);
      throw error;
    }
  }
);

export const selectDecodedLocations = (state) =>
  state.locations.decodedLocations;

export default locationsSlice.reducer;
