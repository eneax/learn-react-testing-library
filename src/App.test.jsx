import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";

test("empty test", () => {});

// test("test throws error explicitly", () => {
//   throw new Error("Test failed");
// });

test("App contains correct heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/learn react/i);
  expect(headingElement).toBeInTheDocument();
});

test("App contains correct link", () => {
  render(<App />);
  const linkElement = screen.getByRole("link", { name: /get started/i });
  expect(linkElement).toBeInTheDocument();
});

test("button click flow", () => {
  // render component
  render(<App />);

  // find button
  const buttonElement = screen.getByRole("button", { name: /blue/i });

  // check initial color
  expect(buttonElement).toHaveClass("red");

  // click button
  fireEvent.click(buttonElement);

  // check button text
  expect(buttonElement).toHaveTextContent(/red/i);

  // check button color
  expect(buttonElement).toHaveClass("blue");
});

test("checkbox flow", () => {
  // render component
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
});
