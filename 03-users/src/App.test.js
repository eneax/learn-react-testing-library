import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import App from "./App";

test("it receives a new user and shows it in the list", async () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  await user.click(nameInput);
  await user.keyboard("John Doe");

  await user.click(emailInput);
  await user.keyboard("john.doe@example.com");

  await user.click(button);

  const name = screen.getByRole("cell", { name: "John Doe" });
  const email = screen.getByRole("cell", { name: "john.doe@example.com" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
