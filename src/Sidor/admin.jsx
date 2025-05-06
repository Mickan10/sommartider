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
  const [error, setError] = useState("");

  const produkterCollection = collection(db, "Produkter");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    } else {
      fetchProdukter();
    }
  }, [navigate]);

  const fetchProdukter = async () => {
    const data = await getDocs(produkterCollection);
    setProdukter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.namn || !form.pris || !form.bild) {
      setError("Fyll i alla fält!");
      return;
    }

    setError(""); 

    if (editingId) {
      await updateDoc(doc(db, "Produkter", editingId), {
        namn: form.namn,
        pris: form.pris,
        bild: form.bild,
      });
      setEditingId(null);
    } else {
      await addDoc(produkterCollection, form);
    }

    setForm({ namn: "", pris: "", bild: "" });
    fetchProdukter();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Produkter", id));
    fetchProdukter();
  };

  const handleEdit = (id, produkt) => {
    setEditingId(id);
    setForm({ namn: produkt.namn, pris: produkt.pris, bild: produkt.bild });
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <h2>Adminpanel</h2>
      <button onClick={handleLogout} className="logout-btn">Logga ut</button>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
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
        <button type="submit">{editingId ? "Uppdatera produkt" : "Lägg till produkt"}</button>
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
                <button onClick={handleSubmit}>Spara</button>
                <button onClick={() => {
                  setEditingId(null);
                  setForm({ namn: "", pris: "", bild: "" });
                }}>Avbryt</button>
              </div>
            ) : (
              <>
                <button onClick={() => handleEdit(produkt.id, produkt)}>Ändra</button>
                <button onClick={() => handleDelete(produkt.id)}>Ta bort</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
