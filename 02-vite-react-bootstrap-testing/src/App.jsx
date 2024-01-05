import Container from "react-bootstrap/Container";

import { OrderDetailsProvider } from "./contexts/OrderDetails";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

export default function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
        <OrderSummary />
      </OrderDetailsProvider>
    </Container>
  );
}
