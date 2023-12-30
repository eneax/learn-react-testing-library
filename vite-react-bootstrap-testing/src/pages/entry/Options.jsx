import * as React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Row from "react-bootstrap/Row";

import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

export default function Options({ optionType }) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        console.log(`Error fetching ${optionType} data`, error);
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}

Options.propTypes = {
  optionType: PropTypes.string.isRequired, // "scoops" or "toppings"
};
