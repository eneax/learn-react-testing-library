import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { createServer } from "../test/server";
import HomeRoute from "./HomeRoute";

createServer([
  {
    path: "/api/repositories",
    res: (req) => {
      const language = req.url.searchParams.get("q").split("language:")[1];

      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      };
    },
  },
]);

test("renders two links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // Loop through each language
  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];

  for (let language of languages) {
    // Check that there are two links for each language
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });

    // Assert that there are two links for each language
    expect(links).toHaveLength(2);

    // Assert that the two links have the correct full_name
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);

    // Assert that the two links have the correct href
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
  }
});
