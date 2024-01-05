import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";
import { kebabCaseToPascalCase } from "./helpers";

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
  expect(buttonElement).toHaveClass("medium-violet-red");

  // click button
  fireEvent.click(buttonElement);

  // check button text
  expect(buttonElement).toHaveTextContent(/red/i);

  // check button color
  expect(buttonElement).toHaveClass("midnight-blue");
});

test("checkbox flow before button click", () => {
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

  // click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("disabled");

  // click checkbox again to re-enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("medium-violet-red");
});

test("checkbox flow after button click", () => {
  // render component
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // click button to change color to blue
  fireEvent.click(buttonElement);

  // click checkbox to disable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeDisabled();
  expect(buttonElement).toHaveClass("disabled");

  // click checkbox again to re-enable button
  fireEvent.click(checkboxElement);
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("midnight-blue");
});

describe("kebabCaseToPascalCase", () => {
  test("works for no hyphens", () => {
    expect(kebabCaseToPascalCase("red")).toBe("Red");
  });
  test("works for one hyphen", () => {
    expect(kebabCaseToPascalCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("works for multiple hyphens", () => {
    expect(kebabCaseToPascalCase("medium-violet-red")).toBe(
      "Medium Violet Red"
    );
  });
});
