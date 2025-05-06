import React, { useEffect, useState } from "react";
import "./admin.css";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [produkter, setProdukter] = useState([]);
  const [form, setForm] = useState({ namn: "", pris: "", bild: "" });
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");

  const produkterCollection = collection(db, "Produkter");

  // Inloggningskontroll
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    } else {
      fetchProdukter();
    }
  }, []);

  // Hämta produkter
  const fetchProdukter = async () => {
    const data = await getDocs(produkterCollection);
    setProdukter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Lägg till produkt
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.namn || !form.pris || !form.bild) {
      alert("Fyll i alla fält!");
      return;
    }

    await addDoc(produkterCollection, form);
    setForm({ namn: "", pris: "", bild: "" });
    fetchProdukter();
  };

  // Ta bort produkt
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Produkter", id));
    fetchProdukter();
  };

  // Starta redigering
  const handleUpdate = (id, currentName) => {
    setEditingId(id);
    setNewName(currentName);
  };

  // Spara nytt namn
  const handleUpdateSubmit = async (id) => {
    if (!newName) return;

    const produktRef = doc(db, "Produkter", id);
    await updateDoc(produktRef, { namn: newName });
    setEditingId(null);
    setNewName("");
    fetchProdukter();
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

            {editingId === produkt.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nytt namn"
                />
                <button onClick={() => handleUpdateSubmit(produkt.id)}>Spara</button>
                <button onClick={() => setEditingId(null)}>Avbryt</button>
              </div>
            ) : (
              <button onClick={() => handleUpdate(produkt.id, produkt.namn)}>Ändra namn</button>
            )}

            <button onClick={() => handleDelete(produkt.id)}>Ta bort</button>
          </div>
        ))}
      </div>
    </div>
  );
}
