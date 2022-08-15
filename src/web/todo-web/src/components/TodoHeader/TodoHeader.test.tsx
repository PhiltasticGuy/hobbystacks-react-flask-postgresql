import { render, screen } from "@testing-library/react";
import TodoHeader from "./TodoHeader";

test("renders name properly", () => {
  // Arrange
  const username = "Shifu";
  const expected = /Welcome to Shifu's TODO list!/i;
  let header = null;

  // Act
  render(<TodoHeader username={username}></TodoHeader>);

  // Assert
  expect(() => {
    header = screen.getByText(expected);
  }).not.toThrow();
  expect(header).not.toBeNull();
  expect(header).toBeInTheDocument();
});

test("renders empty name properly", () => {
  // Arrange
  const username = undefined;
  const expected = /Welcome to He Who Shall Not Be Named's TODO list!/i;
  let header = null;

  // Act
  render(<TodoHeader username={username}></TodoHeader>);

  // Assert
  expect(() => {
    header = screen.getByText(expected);
  }).not.toThrow();
  expect(header).not.toBeNull();
  expect(header).toBeInTheDocument();
});
