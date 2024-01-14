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

  return render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
}

test("displays link to the GitHub homepage for this repo", async () => {
  renderComponent();

  await screen.findByRole("img", { name: /javascript/i }); // fix act warning by waiting for the icon to load first
});
