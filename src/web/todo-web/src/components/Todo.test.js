import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("renders properly", () => {
  // Arrange
  const expected = /Welcome to .* TODO list!/i;
  let header = null;

  // Act
  render(<Todo></Todo>);

  // Assert
  expect(() => {
    header = screen.getByText(expected);
  }).not.toThrow();
  expect(header).not.toBeNull();
  expect(header).toBeInTheDocument();
});
