import React from 'react';
import { Link, useLocation } from 'react-router';
import "./header.css";

export default function Header() {
  const location = useLocation();
  const isSticky = !(location.pathname === "/produkter" || location.pathname === "/admin");

  return (
    <header className={`header ${!isSticky ? "not-sticky" : ""}`}>
      <h1 className="title">Sommartider.</h1>
      <nav className="nav">
        <Link to="/">Hem</Link>
        <Link to="/produkter">Produkter</Link>
        <Link to="/about">Om oss</Link>
      </nav>
    </header>
  );
}
