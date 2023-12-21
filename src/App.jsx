import * as React from "react";

import "./App.css";
import { kebabCaseToPascalCase } from "./helpers";

export default function App() {
  const [disabled, setDisabled] = React.useState(false);
  const [buttonColor, setButtonColor] = React.useState("medium-violet-red");
  const nextButtonColor =
    buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";

  const handleClick = () => {
    setButtonColor(nextButtonColor);
  };

  const handleChange = (event) => {
    setDisabled(event.target.checked);
  };

  return (
    <main>
      <h1>Learn React Testing Library</h1>

      <a
        href="https://testing-library.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Started
      </a>

      <button
        className={`button ${disabled ? "disabled" : buttonColor}`}
        onClick={handleClick}
        disabled={disabled}
      >
        Change to {kebabCaseToPascalCase(nextButtonColor)}
      </button>

      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
        onChange={handleChange}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </main>
  );
}
