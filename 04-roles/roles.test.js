import { screen, render } from "@testing-library/react";

import { RoleExample, AccessibleName, MoreNames, IconButtons } from "./roles";

test("it can find elements by role", () => {
  render(<RoleExample />);

  const roles = [
    "link",
    "button",
    "contentinfo",
    "heading",
    "banner",
    "img",
    "checkbox",
    "spinbutton",
    "radio",
    "textbox",
    "listitem",
    "list",
  ];

  for (let role of roles) {
    const element = screen.getByRole(role);
    expect(element).toBeInTheDocument();
  }
});

// Accessible name of an element is the text within the element
test("it can select elements by accessible name", () => {
  render(<AccessibleName />);

  // const submitButton = screen.getByRole("button", { name: "Submit" });
  // const cancelButton = screen.getByRole("button", { name: "Cancel" });

  const submitButton = screen.getByRole("button", { name: /submit/i });
  const cancelButton = screen.getByRole("button", { name: /cancel/i });

  expect(submitButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
});

test("it shows an email and search inputs", () => {
  render(<MoreNames />);

  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const searchInput = screen.getByRole("textbox", { name: /search/i });

  expect(emailInput).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
});

test("find elements based on label", () => {
  render(<IconButtons />);

  const signInButton = screen.getByRole("button", { name: /sign in/i });
  const signOutButton = screen.getByRole("button", { name: /sign out/i });

  expect(signInButton).toBeInTheDocument();
  expect(signOutButton).toBeInTheDocument();
});
