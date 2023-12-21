import * as React from "react";

import "./App.css";

export default function App() {
  const [disabled, setDisabled] = React.useState(false);
  const [buttonColor, setButtonColor] = React.useState("red");
  const nextButtonColor = buttonColor === "red" ? "blue" : "red";

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
        Change to {nextButtonColor}
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
