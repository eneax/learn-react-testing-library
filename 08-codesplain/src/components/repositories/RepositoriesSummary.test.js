import { screen, render } from "@testing-library/react";

import RepositoriesSummary from "./RepositoriesSummary";

test("displays the primary language of the repository summary", () => {
  const repository = {
    stargazers_count: 1,
    open_issues: 1,
    forks: 1,
    language: "JavaScript",
  };

  render(<RepositoriesSummary repository={repository} />);

  const language = screen.getByText("JavaScript");

  expect(language).toBeInTheDocument();
});
