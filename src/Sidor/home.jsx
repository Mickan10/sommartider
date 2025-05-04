import React from "react";
import "./home.css";
import homePhoto from "../asse/home-photo.webp"
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <img src={homePhoto} alt="Sommartider" className="home-image" />
      <div className="overlay-box">
        <h2>Sommartider!</h2>
        <p>Upptäck våra roliga sommarleksaker – perfekta för lata dagar i trädgården, bus på stranden eller äventyr i parken.</p>
        <Link to="/produkter" className="produkt-knapp">Produkter</Link>
      </div>
    </div>
  );
}
