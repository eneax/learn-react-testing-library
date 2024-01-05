# Server for Vite + React testing project

## Installing

1. `cd` into the `vite-react-bootstrap-testing-server` directory
2. Run `npm i`

## Start the server

Run `npm run dev`. The server will be found at [http://localhost:3030]

## Server routes

- `GET /scoops` and `GET /toppings` return sundae options (array of objects with keys `name` and `imagePath`)
- `POST /order` returns a random order number (does not process order)
- images via static `/images` directory.

## Testing

Run `npm run test`.
