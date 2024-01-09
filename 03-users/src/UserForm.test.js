import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // render the component
  render(<UserForm />);

  // manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // assertion - make sure the component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls the onUserAdd function when the form is submitted", async () => {
  const mock = jest.fn();

  // render the component
  render(<UserForm onUserAdd={mock} />);

  // find the two inputs
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // simulate typing into the name input
  await user.click(nameInput);
  await user.keyboard("John Doe");

  // simulate typing into the email input
  await user.click(emailInput);
  await user.keyboard("john.doe@example.com");

  // find the button
  const button = screen.getByRole("button");

  // simulate clicking the button
  await user.click(button);

  // assert that the onUserAdd function is called with the correct arguments (name and email)
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: "John Doe",
    email: "john.doe@example.com",
  });
});

test("it clears the inputs when the form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />); // no need to pass a mock function here

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  await user.click(nameInput);
  await user.keyboard("John Doe");

  await user.click(emailInput);
  await user.keyboard("john.doe@example.com");

  await user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
