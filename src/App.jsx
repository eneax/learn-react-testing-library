import * as React from "react";

import "./App.css";

export default function App() {
  const [buttonColor, setButtonColor] = React.useState("red");
  const nextButtonColor = buttonColor === "red" ? "blue" : "red";

  const handleClick = () => {
    setButtonColor(nextButtonColor);
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

      <button className={`button ${buttonColor}`} onClick={handleClick}>
        Change to {nextButtonColor}
      </button>

      <input
        type="checkbox"
        id="disable-button-checkbox"
        defaultChecked={false}
      />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </main>
  );
}
