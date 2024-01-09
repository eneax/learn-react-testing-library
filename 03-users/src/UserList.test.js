import { render, screen, within } from "@testing-library/react";

import UserList from "./UserList";

// helper function to render the component instead of using beforeEach
function renderComponent() {
  const users = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Doe", email: "jane.doe@example.com" },
  ];

  render(<UserList users={users} />);

  return {
    users,
  };
}

test("render one row per user", () => {
  // render the component
  const { users } = renderComponent();

  // find all the rows in the table
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // assert that the number of rows is equal to the number of users
  expect(rows).toHaveLength(users.length);
});

test("render the name and email of each user", () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
