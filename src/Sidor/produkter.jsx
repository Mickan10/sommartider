import React, { useState, useEffect } from "react";
import "./produkter.css";
import Cart from "../componenter/cart";
import { db } from "../firebase/firebase"; 
import { collection, getDocs } from "firebase/firestore";

export default function Produkter() {
  const [produkter, setProdukter] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProdukter = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Produkter"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProdukter(data);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
      }
    };

    fetchProdukter();
  }, []);

  const handleAddToCart = (produkt) => {
    setCartItems((prev) => [...prev, produkt]);
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="produkter-sida">
      <div className="top-bar">
        <div className="rubrik-container">
          <h2 className="rubrik">Produkter</h2>
          <p className="rubrik-text">
            Gör sommaren extra rolig! Här hittar du leksaker som passar perfekt för stranden, trädgården och picknickar.
          </p>
        </div>
        <Cart cartItems={cartItems} />
      </div>

      <section className="produkt-grid">
        {produkter.map((produkt) => (
          <div key={produkt.id} className="produkt-kort">
            <div className="bild-wrapper">
              <img src={produkt.bild} alt={produkt.namn} />
              <div className="knapp-grupp">
                <button onClick={() => handleRemoveFromCart(produkt.id)}>-</button>
                <button onClick={() => handleAddToCart(produkt)}>Lägg till</button>
                <button onClick={() => handleAddToCart(produkt)}>+</button>
              </div>
            </div>
            <div className="produkt-info">
              <h3>{produkt.namn}</h3>
              <p>{produkt.pris}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
