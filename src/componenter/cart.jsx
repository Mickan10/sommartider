import React from "react";
import vectorIcon2 from "../asse/shopping.jpg"; 
import useStore from "../store/useStore";
import "./cart.css"; 

export default function Cart() {
  const { cartItems } = useStore();
  const cartCount = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.pris || 0), 0);

  return (
    <div className="cart-container">
      <img src={vectorIcon2} alt="Kundkorg" className="cart-icon" />
      {cartCount > 0 && (
        <>
          <div className="cart-count">{cartCount}</div>
          <div className="cart-total">
            <p>{totalPrice} kr</p>
          </div>
        </>
      )}
    </div>
  );
}

