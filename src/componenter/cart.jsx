import React from "react";
import vectorIcon from "../asse/Vector.png"; 
import useStore from "../store/useStore";

export default function Cart() {

  const { cartItems } = useStore();
  const cartCount = cartItems.length;

  return (
    <div className="cart-container">
      <img src={vectorIcon} alt="Kundkorg" className="cart-icon" />
      {cartCount > 0 && (
        <div className="cart-count">{cartCount}</div>
      )}
    </div>
  );
}
