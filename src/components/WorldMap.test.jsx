import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import WorldMap from "./WorldMap";

const mockStore = configureStore([]);

describe("WorldMap", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      userMarker: {
        lat: 0,
        long: 0,
      },
      fetchedEntities: [],
    });
  });

  it("renders WorldMap component correctly", () => {
    render(
      <Provider store={store}>
        <WorldMap locations={[]} mapHeight={450} center={[10, 0]} />
      </Provider>
    );

    // Assert that the component renders without errors
    const mapContainer = screen.getByTestId("map-container");
    expect(mapContainer).toBeInTheDocument();
  });

  it("renders user marker on the map", () => {
    store.getState().userMarker.lat = 10;
    store.getState().userMarker.long = 0;

    render(
      <Provider store={store}>
        <WorldMap locations={[]} mapHeight={450} center={[10, 0]} />
      </Provider>
    );

    // Assert that the user marker is rendered
    const userMarker = screen.getByAltText("User Marker");
    expect(userMarker).toBeInTheDocument();
  });

  it("fetches and displays fetched entities", async () => {
    store.getState().userMarker.lat = 10;
    store.getState().userMarker.long = 0;

    // Simulate fetched entities
    store.getState().fetchedEntities = [];

    render(
      <Provider store={store}>
        <WorldMap locations={[]} mapHeight={450} center={[10, 0]} />
      </Provider>
    );

    // Wait for fetched entities to display
    await waitFor(() => {
      const fetchedEntity = screen.getByText("Fetched Entity Name");
      expect(fetchedEntity).toBeInTheDocument();
    });
  });
});
