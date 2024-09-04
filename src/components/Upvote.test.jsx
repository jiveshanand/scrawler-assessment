import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Upvote from "./Upvote";

describe("Upvote Component", () => {
  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Upvote isSelected={false} onClick={handleClick} />);

    const upvoteElement = screen.getByRole("button");

    fireEvent.click(upvoteElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
