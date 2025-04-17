import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landingPage/Landing";
import Order from "./pages/order/Order";
import Account from "./pages/account/Account";
import Checkout from "./pages/checkout/Checkout";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/my-orders" element={<Order />} />
      <Route path="/my-account" element={<Account />} />
      <Route path="/my-orders/last" element={<Checkout />} />
    </Routes>
  )
}

export default App;
