import React, { useState, useEffect } from "react";
import "./produkter.css";
import Cart from "../componenter/cart";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import useStore from "../store/useStore";

export default function Produkter() {
  const [produkter, setProdukter] = useState([]);
  const [sokterm, setSokterm] = useState("");
  const [sortering, setSortering] = useState({ fält: "namn", riktning: "stigande" });

  const { cartItems, addToCart, removeFromCart } = useStore();

  useEffect(() => {
    const fetchProdukter = async () => {
      const querySnapshot = await getDocs(collection(db, "Produkter"));
      const data = querySnapshot.docs.map((doc) => {
        const produkt = doc.data();
        return {
          id: doc.id,
          ...produkt,
          pris: Number(produkt.pris.toString().replace(/[^\d.]/g, "")),
        };
      });
      setProdukter(data);
    };

    fetchProdukter();
  }, []);

  const filtreradeProdukter = produkter
    .filter((produkt) =>
      produkt.namn.toLowerCase().includes(sokterm.toLowerCase())
    )
    .sort((a, b) => {
      const { fält, riktning } = sortering;
      let jämförelse = 0;

      if (fält === "namn") {
        jämförelse = a.namn.localeCompare(b.namn);
      } else if (fält === "pris") {
        jämförelse = a.pris - b.pris;
      }

      return riktning === "stigande" ? jämförelse : -jämförelse;
    });

  const getAntalIKundkorgen = (produktId) => {
    const produkt = cartItems.find((item) => item.id === produktId);
    return produkt ? produkt.quantity : 0;
  };

  return (
    <div className="produkter-sida">
      <div className="top-bar">
        <div className="rubrik-container">
          <h2 className="rubrik">Produkter</h2>
          <p className="produktp">
            Gör sommaren extra rolig! Här hittar du leksaker som passar perfekt
            för stranden, trädgården och picknickar.
          </p>
        </div>
        <Cart cartItems={cartItems} />
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Sök produkt..."
          value={sokterm}
          onChange={(e) => setSokterm(e.target.value)}
        />
        <select
          value={sortering.fält}
          onChange={(e) => setSortering({ ...sortering, fält: e.target.value })}
        >
          <option value="namn">Sortera efter namn</option>
          <option value="pris">Sortera efter pris</option>
        </select>
        <select
          value={sortering.riktning}
          onChange={(e) =>
            setSortering({ ...sortering, riktning: e.target.value })
          }
        >
          <option value="stigande">Stigande</option>
          <option value="fallande">Fallande</option>
        </select>
      </div>

      <hr />

      <section className="produkt-grid">
        {filtreradeProdukter.map((produkt) => (
          <div key={produkt.id} className="produkt-kort">
            <div className="bild-wrapper">
              <img src={produkt.bild} alt={produkt.namn} />

              {/* Antal i kundkorgen */}
              {getAntalIKundkorgen(produkt.id) > 0 && (
                <div className="produkt-antal">
                  {getAntalIKundkorgen(produkt.id)}
                </div>
              )}

              {/* +- knappar visas vid hover */}
              <div className="bild-knappar">
                <button onClick={() => removeFromCart(produkt.id)}>-</button>
                <button
                  onClick={() =>
                    addToCart({
                      ...produkt,
                      pris: Number(produkt.pris),
                      quantity: 1,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="produkt-info">
              <h3>{produkt.namn}</h3>
              <p>{produkt.pris} kr</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
