import React, { useEffect, useState } from "react";
import "./admin.css"; 
import { db } from "../firebase/firebase"; 
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function Admin() {
  const [produkter, setProdukter] = useState([]);
  const [form, setForm] = useState({ namn: "", pris: "", bild: "" });

  const produkterCollection = collection(db, "Produkter");

  // Hämta produkter
  const fetchProdukter = async () => {
    const data = await getDocs(produkterCollection);
    setProdukter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchProdukter();
  }, []);

  // Lägg till produkt
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.namn || !form.pris || !form.bild) return alert("Fyll i alla fält!");

    await addDoc(produkterCollection, form);
    setForm({ namn: "", pris: "", bild: "" });
    fetchProdukter();
  };

  // Ta bort 
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Produkter", id));
    fetchProdukter();
  };

  // Ändra namn
  const handleUpdate = async (id) => {
    const newName = prompt("Nytt namn?");
    if (newName) {
      const produktRef = doc(db, "Produkter", id);
      await updateDoc(produktRef, { namn: newName });
      fetchProdukter();
    }
  };

  return (
    <div className="admin-container">
      <h2>Adminpanel</h2>

      <form onSubmit={handleAdd} className="admin-form">
        <input
          type="text"
          placeholder="Produktnamn"
          value={form.namn}
          onChange={(e) => setForm({ ...form, namn: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pris"
          value={form.pris}
          onChange={(e) => setForm({ ...form, pris: e.target.value })}
        />
        <input
          type="text"
          placeholder="Bild-URL"
          value={form.bild}
          onChange={(e) => setForm({ ...form, bild: e.target.value })}
        />
        <button type="submit">Lägg till produkt</button>
      </form>

      <div className="admin-list">
        {produkter.map((produkt) => (
          <div key={produkt.id} className="admin-item">
            <img src={produkt.bild} alt={produkt.namn} />
            <div>
              <strong>{produkt.namn}</strong> - {produkt.pris}
            </div>
            <button onClick={() => handleDelete(produkt.id)}>Ta bort</button>
            <button onClick={() => handleUpdate(produkt.id)}>Ändra namn</button>
          </div>
        ))}
      </div>
    </div>
  );
}
