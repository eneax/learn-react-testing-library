import { screen, render, within } from "@testing-library/react";

import { FormData } from "./matchers";

function toContainRole(containerElement, role, quantity = 1) {
  const elements = within(containerElement).getAllByRole(role);

  if (elements.length === quantity) {
    return {
      pass: true,
    };
  }

  return {
    pass: false,
    message: () =>
      `Expected to find ${quantity} elements with the role of ${role}, but found ${elements.length} instead.`,
  };
}

expect.extend({ toContainRole });

test("form displays two buttons", () => {
  render(<FormData />);

  const form = screen.getByRole("form");

  // const buttons = within(form).getAllByRole("button");
  // expect(buttons).toHaveLength(2);

  expect(form).toContainRole("button", 2);
});
