import React, { useState, useEffect } from "react";
import "./produkter.css";
import Cart from "../componenter/cart";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import useStore from "../store/useStore";

export default function Produkter() {
  const [produkter, setProdukter] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const { cartItems, addToCart, removeFromCart } = useStore();

  useEffect(() => {
    const fetchProdukter = async () => {
      const querySnapshot = await getDocs(collection(db, "Produkter"));
      const data = querySnapshot.docs.map((doc) => {
        const produkt = doc.data();
        return {
          id: doc.id,
          ...produkt,
          pris: Number(produkt.pris.toString().replace(/[^\d.]/g, "")), // Tar bort "kr" och gör till tal
        };
      });
      setProdukter(data); 
    };
  
    fetchProdukter();
  }, []);
  
  

  // Scrollpil 
      useEffect(() => {
        const handleScroll = () => {
          setShowButton(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

      const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }; 

  return (
    <div className="produkter-sida">
      <div className="top-bar">
        <div className="rubrik-container">
          <h2 className="rubrik">Produkter</h2>
          <p>
            Gör sommaren extra rolig! Här hittar du leksaker som passar perfekt
            för stranden, trädgården och picknickar.
          </p>
        </div>
        <Cart cartItems={cartItems} />
      </div>
      <hr />
      <section className="produkt-grid">
        {produkter.map((produkt) => (
          <div key={produkt.id} className="produkt-kort">
            <div className="bild-wrapper">
              <img src={produkt.bild} alt={produkt.namn} />
              <div className="knapp-grupp">
                <button onClick={() => removeFromCart(produkt.id)}>-</button>
                <button onClick={() => addToCart({ ...produkt, pris: Number(produkt.pris) })}>Lägg till</button>
                <button onClick={() => addToCart({ ...produkt, pris: Number(produkt.pris) })}>+</button>
              </div>
            </div>
            <div className="produkt-info">
              <h3>{produkt.namn}</h3>
              <p>{produkt.pris}</p>
            </div>
          </div>
        ))}
      </section>

          {showButton && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    )}
      
    </div>
  );
}
