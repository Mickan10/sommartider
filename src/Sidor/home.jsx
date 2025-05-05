import React from "react";
import "./home.css";
import homePhoto from "../asse/home-photo.webp";
import small1 from "../asse/home1.webp";
import small2 from "../asse/home2.webp";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <img src={homePhoto} alt="Sommartider" className="home-image" />
        <div className="overlay-box">
          <h2>Sommartider.</h2>
          <p>
            Upptäck våra roliga sommarleksaker – perfekta för lata dagar i
            trädgården, bus på stranden eller äventyr i parken.
          </p>
          <Link to="/produkter" className="produkt-knapp">
            Produkter
          </Link>
        </div>
      </div>

      {/* Sektionen ligger nu utanför home-container */}
      <section className="small-images-container">
        <div className="small-image-box">
          <img src={small1} alt="Leksak 1" className="small-image" />
          <p className="small-image-text">Lek i solen</p>
        </div>
        <div className="small-image-box">
          <img src={small2} alt="Leksak 2" className="small-image" />
        </div>
      </section>
    </>
  );
}
