import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../SummaryForm";

test("Initial Conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden by default
  const nullPopover = screen.queryByText(/nothing to see here/i); // queryByText because the element is not expected to be there
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/nothing to see here/i); // getByText because the element is expected to be there
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
