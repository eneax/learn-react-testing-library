import * as React from "react";

export function ColorList() {
  return (
    <ul>
      <li>Red</li>
      <li>Blue</li>
      <li>Green</li>
    </ul>
  );
}

function fakeFetchColors() {
  return Promise.resolve(["red", "blue", "green"]);
}

export function AsyncColorList() {
  const [colors, setColors] = React.useState([]);

  React.useEffect(() => {
    fakeFetchColors().then((c) => setColors(c));
  }, []);

  return (
    <ul>
      {colors.map((color) => (
        <li key={color}>{color}</li>
      ))}
    </ul>
  );
}
