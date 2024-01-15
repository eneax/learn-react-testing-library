import { screen, render } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";

import HomeRoute from "./HomeRoute";

const handlers = [
  rest.get("/api/repositories", (req, res, ctx) => {
    const language = req.url.searchParams.get("q").split("language:")[1];

    return res(
      ctx.json({
        items: [
          {
            id: 1,
            full_name: `${language}_one`,
          },
          {
            id: 2,
            full_name: `${language}_two`,
          },
        ],
      })
    );
  }),
];

const server = setupServer(...handlers);

// executes the callback function one time before each test
beforeAll(() => {
  // before a test, start a server and listen for requests
  server.listen();
});

// executes the callback function after each test has run, regardless of whether the tests passed or failed
afterEach(() => {
  // reset each handler to its initial state
  server.resetHandlers();
});

// executes the callback function one time after all tests have finished running
afterAll(() => {
  // after running the tests, stop the server and clean up
  server.close();
});

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
