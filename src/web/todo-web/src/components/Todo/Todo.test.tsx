import { render, screen } from "@testing-library/react";
import TodoService from "services/TodoService";
import Todo from "./Todo";

test("renders properly", () => {
  // Arrange
  const todoService = new TodoService();
  const expected = /Welcome to .* TODO list!/i;
  let header = null;

  // Act
  render(<Todo todoService={todoService}></Todo>);

  // Assert
  expect(() => {
    header = screen.getByText(expected);
  }).not.toThrow();
  expect(header).not.toBeNull();
  expect(header).toBeInTheDocument();
});
