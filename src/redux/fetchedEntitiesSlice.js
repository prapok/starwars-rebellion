import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetching entities by id
export const fetchEntityData = createAsyncThunk(
  "fetchedEntities/fetchEntityData",
  async (entityId) => {
    try {
      const response = await axios.get(
        `https://akabab.github.io/starwars-api/api/id/${entityId}.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching entity data:", error);
      return null;
    }
  }
);

const fetchedEntitiesSlice = createSlice({
  name: "fetchedEntities",
  initialState: [],
  reducers: {
    setFetchedEntities: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEntityData.fulfilled, (state, action) => {
      if (action.payload) {
        const existingEntity = state.find(
          (entity) => entity.id === action.payload.id
        );
        if (!existingEntity) {
          state.push(action.payload);
        }
      }
    });
  },
});

export const { setFetchedEntities } = fetchedEntitiesSlice.actions;
export default fetchedEntitiesSlice.reducer;
