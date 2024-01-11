import { screen, render } from "@testing-library/react";

import { ColorList, AsyncColorList } from "./query";

test("getBy, queryBy, findBy finding 0 elements", async () => {
  render(<ColorList />);

  expect(() => screen.getByRole("textbox")).toThrow(); // an error is thrown

  expect(screen.queryByRole("textbox")).toEqual(null); // null is returned

  let errorThrown = false;
  try {
    await screen.findByRole("textbox");
  } catch (error) {
    errorThrown = true;
  }
  expect(errorThrown).toEqual(true); // a promise is rejected
});

test("getBy, queryBy, findBy finding 1 element", async () => {
  render(<ColorList />);

  expect(screen.getByRole("list")).toBeInTheDocument();

  expect(screen.queryByRole("list")).toBeInTheDocument();

  expect(await screen.findByRole("list")).toBeInTheDocument();
});

test("getBy, queryBy, findBy finding > 1 elements", async () => {
  render(<ColorList />);

  expect(() => screen.getByRole("listitem")).toThrow();

  expect(() => screen.queryByRole("listitem")).toThrow();

  let errorThrown = false;
  try {
    await screen.findByRole("listitem");
  } catch (error) {
    errorThrown = true;
  }
  expect(errorThrown).toEqual(true);
});

test("getAllBy, queryAllBy, findAllBy", async () => {
  render(<ColorList />);

  expect(screen.getAllByRole("listitem")).toHaveLength(3);

  expect(screen.queryAllByRole("listitem")).toHaveLength(3);

  expect(await screen.findAllByRole("listitem")).toHaveLength(3);
});

test("favor getBy to prove an element exists", () => {
  render(<ColorList />);

  const element = screen.getByRole("list");

  expect(element).toBeInTheDocument();
});

test("favor queryBy to prove an element does NOT exists", () => {
  render(<ColorList />);

  const element = screen.queryByRole("textbox");

  expect(element).not.toBeInTheDocument();
});

test("favor findBy or findAllBy when data fetching", async () => {
  render(<AsyncColorList />);

  const elements = await screen.findAllByRole("listitem");

  expect(elements).toHaveLength(3);
});
