import React from "react";
import "./home.css";
import homePhoto from "../asse/home-photo.webp";
import small1 from "../asse/home1.webp";
import small2 from "../asse/home2.webp";
import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <img src={homePhoto} alt="Sommartider" className="home-image" />
        <div className="overlay-box">
        <h2>Sommartider.</h2>
        <p>
          Välkommen till ett hav av sommarlek! Utforska vårt färgglada sortiment av roliga och spännande sommarleksaker – perfekta för sköna dagar i trädgården, plask och stoj vid stranden eller fartfyllda äventyr i parken. Oavsett om du vill bygga sandslott, spela vattenkrig eller bara njuta av solskenet med vänner och familj, har vi leksakerna som förvandlar varje sommardag till ett minne fyllt av skratt och glädje.
        </p>
        <div className="button-wrapper">
          {/*<Link to="/produkter" className="produkt-knapp">
            Produkter
          </Link>*/}
        </div>
      </div>
      </div>

      <hr />

      <section className="small-images-container">
        <div className="small-image-box">
          <img src={small1} alt="Leksak 1" className="small-image large" />
          <p className="small-image-text"></p>
          <Link to="/produkter" className="gul-knapp">Se alla produkter</Link>
        </div>
        <div className="small-image-box">
          <img src={small2} alt="Leksak 2" className="small-image small" />
          <p className="small-image-text"></p>
        </div>
    </section>
    </>
  );
}
