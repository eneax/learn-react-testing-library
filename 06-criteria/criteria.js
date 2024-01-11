import * as React from "react";

export function DataForm() {
  const [email, setEmail] = React.useState("me@mail.com");

  return (
    <form>
      <h3>Enter data</h3>

      <div data-testid="image wrapper">
        <img src="data.jpeg" alt="data" />
      </div>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="color">Color</label>
      <input id="color" placeholder="red" />

      <button title="Click when ready to submit">Submit</button>
    </form>
  );
}
