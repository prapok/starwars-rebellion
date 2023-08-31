import React from "react";
import { render, screen } from "@testing-library/react";
import UserCard from "./UserCard";

describe("UserCard", () => {
  const mockUser = {
    name: "Luke Skywalker",
    gender: "male",
    height: "172",
    mass: "77",
    distance: 123.45,
    image: "mock_image_url",
  };

  it("renders UserCard component correctly", () => {
    render(<UserCard user={mockUser} />);

    // Assert that the user's name is rendered
    const userName = screen.getByText("Luke Skywalker");
    expect(userName).toBeInTheDocument();

    // Assert that gender, height, mass, and distance are displayed
    const gender = screen.getByText("Gender: male");
    expect(gender).toBeInTheDocument();

    const height = screen.getByText("Height: 172");
    expect(height).toBeInTheDocument();

    const mass = screen.getByText("Mass: 77");
    expect(mass).toBeInTheDocument();

    const distance = screen.getByText("In Distance: 123.45 km");
    expect(distance).toBeInTheDocument();

    // Assert that user image is rendered with the correct alt text
    const userImage = screen.getByAltText("Luke Skywalker");
    expect(userImage).toBeInTheDocument();
    expect(userImage).toHaveAttribute("src", "mock_image_url");
  });
});
