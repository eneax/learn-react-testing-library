import { screen, render } from "@testing-library/react";

import { DataForm } from "./criteria";

test("selecting different elements", () => {
  render(<DataForm />);

  const elements = [
    screen.getByRole("button"),
    // screen.getByText("Enter Data"),
    screen.getByText(/enter/i),
    screen.getByLabelText("Email"),
    screen.getByPlaceholderText("Red"),
    screen.getByDisplayValue("me@mail.com"),
    screen.getByAltText("data"),
    // screen.getByTitle("Click when ready to submit"),
    screen.getByTitle(/ready to submit/i),
    screen.getByTestId("image wrapper"),
  ];

  for (const element of elements) {
    expect(element).toBeInTheDocument();
  }
});
