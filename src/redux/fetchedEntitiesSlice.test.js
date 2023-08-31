import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import { fetchEntityData, setFetchedEntities } from "./fetchedEntitiesSlice";

// Mock axios get function
jest.mock("axios");

// Mock data
const mockEntityData = {
  id: 1,
  name: "Mock Entity",
};

describe("fetchedEntitiesSlice", () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  it("fetchEntityData should fetch entity data correctly", async () => {
    // Mock axios.get response
    axios.get.mockResolvedValue({ data: mockEntityData });

    const store = mockStore();

    // Dispatch fetchEntityData
    await store.dispatch(fetchEntityData(1));

    const actions = store.getActions();
    expect(actions[0].payload).toEqual(mockEntityData);
  });

  it("setFetchedEntities should update state correctly", () => {
    const initialState = [];
    const nextState = setFetchedEntities(initialState, {
      payload: [mockEntityData],
    });

    // Check if the state has been updated correctly
    expect(nextState).toEqual([mockEntityData]);
  });
});
