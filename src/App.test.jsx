import React from "react";
import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import App from "./App";
import { fetchLocations } from "./redux/locationsSlice";

// Mocking react-redux useDispatch and useSelector
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("App", () => {
  test("renders app with correct text", () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue([]);

    render(<App />);

    // Check if the Star Wars Logo is present
    const logoElement = screen.getByAltText("Star Wars Logo");
    expect(logoElement).toBeInTheDocument();

    // Check if the instruction text is present
    const instructionText = screen.getByText(
      /Click on the map to set your distance/i
    );
    expect(instructionText).toBeInTheDocument();
  });

  test("dispatches fetchLocations action on mount", () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue([]);

    render(<App />);

    // Check if fetchLocations action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith(fetchLocations());
  });
});
