import React, { useEffect, useRef, useState } from "react";
import "./admin.css";
import { useNavigate } from "react-router";
import { db } from "../firebase/firebase";
import {collection,getDocs,addDoc,deleteDoc,updateDoc,doc,} from "firebase/firestore";
import { productSchema } from "../valid/valid";

export default function Admin() {
  const navigate = useNavigate();
  const [produkter, setProdukter] = useState([]);
  const [form, setForm] = useState({ namn: "", pris: "", bild: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState({});
  const formRef = useRef(null); 

  const produkterCollection = collection(db, "Produkter");

  const fetchProdukter = async () => {
    const data = await getDocs(produkterCollection);
    setProdukter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    } else {
      fetchProdukter();
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = productSchema.validate(form, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        const field = detail.path[0];
        newErrors[field] = detail.message;
      });
      setError(newErrors);
      return;
    }

    setError({});

    const cleanedForm = {
      ...form,
      pris: form.pris.replace(/[^\d]/g, "")
    };

    if (editingId) {
      await updateDoc(doc(db, "Produkter", editingId), cleanedForm);
      setEditingId(null);
    } else {
      await addDoc(produkterCollection, cleanedForm);
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
    setForm({
      namn: produkt.namn,
      pris: produkt.pris,
      bild: produkt.bild,
    });
    setError({});

    //Scrolla till formuläret vid ändra
    setTimeout(() => {
      const element = formRef.current;
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    
        setTimeout(() => {
          window.scrollBy({ top: -600, behavior: "smooth" });
        }, 100); 
      }
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <h2>Adminpanel</h2>
      <button onClick={handleLogout} className="logout-btn">
        Logga ut
      </button>

      <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
        <div className="input-group">
          {error.namn && <p className="error-message">{error.namn}</p>}
          <label htmlFor="namn">Produktnamn:</label>
          <input
            id="namn"
            type="text"
            value={form.namn}
            onChange={(e) => setForm({ ...form, namn: e.target.value })}
          />
        </div>

        <div className="input-group">
          {error.pris && <p className="error-message">{error.pris}</p>}
          <label htmlFor="pris">Pris:</label>
          <input
            id="pris"
            type="text"
            value={form.pris}
            onChange={(e) => setForm({ ...form, pris: e.target.value })}
          />
        </div>

        <div className="input-group">
          {error.bild && <p className="error-message">{error.bild}</p>}
          <label htmlFor="bild">Bild-URL:</label>
          <input
            id="bild"
            type="text"
            value={form.bild}
            onChange={(e) => setForm({ ...form, bild: e.target.value })}
          />
        </div>

        <button type="submit">
          {editingId ? "Uppdatera produkt" : "Lägg till produkt"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ namn: "", pris: "", bild: "" });
              setError({});
            }}
          >
            Avbryt
          </button>
        )}
      </form>

      <div className="admin-list">
        {produkter.map((produkt) => (
          <div key={produkt.id} className="admin-item">
            <img src={produkt.bild} alt={produkt.namn} />
            <div>
              <strong>{produkt.namn}</strong> {produkt.pris} kr
            </div>
            <button onClick={() => handleEdit(produkt.id, produkt)}>
              Ändra
            </button>
            <button onClick={() => handleDelete(produkt.id)}>
              Ta bort
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
