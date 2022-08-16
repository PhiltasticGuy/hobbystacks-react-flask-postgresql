import { render, screen, waitFor, within } from "@testing-library/react";
import ITodoItem from "objects/ITodoItem";
import ITodoService from "services/ITodoService";
import Todo from "./Todo";

test("renders no TODO items initially", async () => {
  // Arrange
  const todoService: ITodoService = {
    getItems: jest.fn(() => Promise.resolve([] as ITodoItem[])),
    addItem: jest.fn((item: ITodoItem) => Promise.resolve(false)),
  };
  const expected = /Welcome to .* TODO list!/i;
  let header = null;

  // Act
  render(<Todo todoService={todoService} username={null}></Todo>);
  await waitFor(() => expect(todoService.getItems).toHaveBeenCalledTimes(1), {
    timeout: 2000,
  });

  // Assert: Header
  expect(() => {
    header = screen.getByText(expected);
  }).not.toThrow();
  expect(header).not.toBeNull();
  expect(header).toBeInTheDocument();
  expect(todoService.getItems).toBeCalled();
  expect(() => {
    header = screen.getByText(expected);
  }).not.toThrow();

  // Assert: Items
  const todoItems = screen.getByRole("list");
  expect(within(todoItems).queryByRole("listitem")).not.toBeInTheDocument();

  // Assert: Footer
});

test("renders single TODO item", async () => {
  // Arrange
  const items: ITodoItem[] = [{ id: 1, title: "Hello World", isDone: false }];
  const todoService: ITodoService = {
    getItems: jest.fn(() => Promise.resolve(items)),
    addItem: jest.fn((item: ITodoItem) => new Promise<boolean>(() => true)),
  };
  const expected = /Welcome to .* TODO list!/i;
  let header = null;

  // Act
  render(<Todo todoService={todoService} username={null}></Todo>);

  // Assert: Header
  expect(() => {
    header = screen.getByText(expected);
  }).not.toThrow();
  expect(header).not.toBeNull();
  expect(header).toBeInTheDocument();
  expect(todoService.getItems).toBeCalled();
  expect(() => {
    header = screen.getByText(expected);
  }).not.toThrow();

  // Assert: Items
  const todoList = screen.getByRole("list");
  expect(
    await within(todoList).findByRole("listitem", {
      name: /Hello World/i,
    })
  ).toBeInTheDocument();

  const todoItems = await within(todoList).findAllByRole("listitem", {
    name: /Hello World/i,
  });
  expect(todoItems).toHaveLength(1);

  // Assert: Footer
});
