import userEvent from "@testing-library/user-event";

import { render, screen } from "../../../test-utils/testing-library-utils";
import ScoopOption from "../ScoopOption";

// NOTE: here you are testing your validation rules, not React Bootstrap's
test("Indicate if scoop count is non-int or out of range", async () => {
  const user = userEvent.setup();
  render(<ScoopOption />);
  const vanillaInput = screen.getByRole("spinbutton");

  // expect input to be invalid with negative number
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  // expect input to be invalid with decimal number
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  // expect input to be invalid with big number
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  // expect input to be valid
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
