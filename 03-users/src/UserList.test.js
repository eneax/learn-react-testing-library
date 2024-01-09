import { render, screen, within } from "@testing-library/react";

import UserList from "./UserList";

test("render one row per user", () => {
  // render the component
  const users = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Doe", email: "jane.doe@example.com" },
  ];
  render(<UserList users={users} />);

  // find all the rows in the table
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // assert that the number of rows is equal to the number of users
  expect(rows).toHaveLength(users.length);
});
