import { render, screen } from "@testing-library/react";

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

test("button renders with correct color before click", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  expect(buttonElement).toHaveClass("red-button");
});

test("button renders with correct text before click", () => {});

test("button renders with correct color after click", () => {});

test("button renders with correct text after click", () => {});
