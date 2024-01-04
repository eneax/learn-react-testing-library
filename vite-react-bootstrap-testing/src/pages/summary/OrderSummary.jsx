import PropTypes from "prop-types";

import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

import SummaryForm from "./SummaryForm";

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  // only display toppings if the toppings total is non-zero
  const hasToppings = totals.toppings > 0;
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingsArray = Object.keys(optionCounts.toppings);
    const toppingList = toppingsArray.map((key) => <li key={key}>{key}</li>);
    toppingsDisplay = (
      <>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
        <ul>{toppingList}</ul>
      </>
    );
  }

  return (
    <main>
      <h1>Order Summary</h1>

      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>

      {toppingsDisplay}

      <SummaryForm setOrderPhase={setOrderPhase} />
    </main>
  );
}

OrderSummary.propTypes = {
  setOrderPhase: PropTypes.func.isRequired,
};
