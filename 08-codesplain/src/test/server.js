import { setupServer } from "msw/node";
import { rest } from "msw";

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map((config) => {
    return rest[config.method || "get"](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

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
}
