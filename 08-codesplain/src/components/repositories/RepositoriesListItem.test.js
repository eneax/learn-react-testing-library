import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import RepositoriesListItem from "./RepositoriesListItem";

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "JavaScript",
    description: "A JS library for building UIs",
    owner: "facebook",
    name: "react",
    html_url: "https://github.com/facebook/react",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test("displays link to the GitHub homepage for this repo", async () => {
  const { repository } = renderComponent();

  // fix act warning by waiting for the icon to load first
  await screen.findByRole("img", { name: /javascript/i });

  const link = screen.getByRole("link", { name: /github repository/i });
  expect(link).toHaveAttribute("href", repository.html_url);
});

test("displays the FileIcon with the appropriate icon", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", { name: /javascript/i });

  expect(icon).toHaveClass("js-icon");
});
