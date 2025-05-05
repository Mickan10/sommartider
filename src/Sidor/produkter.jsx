import React, { useState } from "react";
import "./produkter.css";
import Cart from "../componenter/cart";

// Importera alla 20 bilder
import produkt1 from "../asse/produkt1.webp";
import produkt2 from "../asse/produkt2.webp";
import produkt3 from "../asse/produkt3.webp";
import produkt4 from "../asse/produkt4.webp";
import produkt5 from "../asse/produkt5.webp";
import produkt6 from "../asse/produkt6.webp";
import produkt7 from "../asse/produkt7.webp";
import produkt8 from "../asse/produkt8.webp";
import produkt9 from "../asse/produkt9.webp";
import produkt10 from "../asse/produkt10.webp";
import produkt11 from "../asse/produkt11.webp";
import produkt12 from "../asse/produkt12.webp";
/*
import produkt13 from "../asse/produkt13.webp";
import produkt14 from "../asse/produkt14.webp";
import produkt15 from "../asse/produkt15.webp";
import produkt16 from "../asse/produkt16.webp";
import produkt17 from "../asse/produkt17.webp";
import produkt18 from "../asse/produkt18.webp";
import produkt19 from "../asse/produkt19.webp";
import produkt20 from "../asse/produkt20.webp";
*/


const bilder = [
  produkt1, produkt2, produkt3, produkt4, produkt5,
  produkt6, produkt7, produkt8, produkt9, produkt10,
  produkt11, produkt12, /*produkt13, produkt14, produkt15,
  produkt16, produkt17, produkt18, produkt19, produkt20,*/
];

const produkter = bilder.map((bild, index) => ({
  id: index + 1,
  namn: `Produkt ${index + 1}`,
  pris: `${49 + index} kr`,
  bild: bild,
}));

export default function Produkter() {
    const [cartItems, setCartItems] = useState([]);
  
    const handleAddToCart = (produkt) => {
      setCartItems((prev) => [...prev, produkt]);
    };
  
    const handleRemoveFromCart = (id) => {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    };
  
    return (
      <div className="produkter-sida">
        <section className="produkt-grid">
          {produkter.map((produkt) => (
            <div key={produkt.id} className="produkt-kort">
              <div className="bild-wrapper">
                <img src={produkt.bild} alt={produkt.namn} />
                <button
                  className="lagg-till-knapp"
                  onClick={() => handleAddToCart(produkt)}
                >
                  Lägg till
                </button>
              </div>
              <div className="produkt-info">
                <h3>{produkt.namn}</h3>
                <p>{produkt.pris}</p>
              </div>
            </div>
          ))}
        </section>
  
        <Cart items={cartItems} onRemove={handleRemoveFromCart} />
      </div>
    );
  }
