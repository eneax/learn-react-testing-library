import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";

import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";

async function renderComponent() {
  render(
    // Fix swr cache issue
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );

  await screen.findAllByRole("link");
}

describe("when not signed in", () => {
  // createServer() => GET /api/user => { user: null }
  createServer([
    {
      path: "/api/user",
      res: () => ({ user: null }),
    },
  ]);

  test("sign in and sign up are visible", async () => {
    await renderComponent();

    const signInButton = screen.getByRole("link", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");

    const signUpButton = screen.getByRole("link", { name: /sign up/i });
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  test("sign out is not visible", async () => {
    await renderComponent();

    const signOutButton = screen.queryByRole("link", { name: /sign out/i });
    expect(signOutButton).not.toBeInTheDocument();
  });
});

describe("when signed in", () => {
  // createServer() => GET /api/user => { user: { id: 1, email: 'testuser@test.com' } }
  createServer([
    {
      path: "/api/user",
      res: () => ({
        user: { id: 1, email: "testuser@test.com" },
      }),
    },
  ]);

  test("sign in and sign up are not visible", async () => {
    await renderComponent();

    const signInButton = screen.queryByRole("link", { name: /sign in/i });
    expect(signInButton).not.toBeInTheDocument();

    const signUpButton = screen.queryByRole("link", { name: /sign up/i });
    expect(signUpButton).not.toBeInTheDocument();
  });

  test("sign out is visible", async () => {
    await renderComponent();

    const signOutButton = screen.getByRole("link", { name: /sign out/i });

    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute("href", "/signout");
  });
});
