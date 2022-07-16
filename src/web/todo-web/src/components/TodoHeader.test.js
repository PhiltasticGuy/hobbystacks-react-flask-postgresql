import { render, screen } from "@testing-library/react";
import TodoHeader from "./TodoHeader";

test("renders name properly", () => {
  // Arrange
  const user = {
    name: "Shifu",
  };
  const expected = /Welcome to Shifu's TODO list!/i;
  let header = null;

  // Act
  render(<TodoHeader user={user}></TodoHeader>);

  // Assert
  expect(() => {
    header = screen.getByText(expected);
  }).not.toThrow();
  expect(header).not.toBeNull();
  expect(header).toBeInTheDocument();
});

test("renders empty name properly", () => {
  // Arrange
  const user = {};
  const expected = /Welcome to He Who Shall Not Be Named's TODO list!/i;
  let header = null;

  // Act
  render(<TodoHeader user={user}></TodoHeader>);

  // Assert
  expect(() => {
    header = screen.getByText(expected);
  }).not.toThrow();
  expect(header).not.toBeNull();
  expect(header).toBeInTheDocument();
});
