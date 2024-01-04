import userEvent from "@testing-library/user-event";

import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("Update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();

  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopsSubtotal).toHaveTextContent("2.00"); // $2 per scoop

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00"); // $2 per scoop so $4 chocolate + $2 vanilla
});

test("Update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();

  render(<Options optionType="toppings" />);

  // make sure total starts out $0.00
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  // check the Hot fudge toppings and update the subtotal
  const hotFudge = await screen.findByRole("checkbox", { name: "Hot fudge" });
  await user.click(hotFudge);
  expect(toppingsTotal).toHaveTextContent("1.50"); // $1.50 per scoop

  // check the cherries toppings and update the subtotal
  const cherries = await screen.findByRole("checkbox", { name: "Cherries" });
  await user.click(cherries);
  expect(toppingsTotal).toHaveTextContent("3.00"); // $1.50 Hot fudge + $1.50 Cherries

  // remove cherries and update the subtotal
  await user.click(cherries);
  expect(toppingsTotal).toHaveTextContent("1.50"); // $1.50 Hot fudge
});
