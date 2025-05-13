import { Link } from 'react-router'; 
import React from 'react';
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <h1 className="title">Sommartider.</h1>
      <nav className="nav">
        <Link to="/">Hem</Link>
        <Link to="/produkter">Produkter</Link>
        <Link to="/about">Om oss</Link>
      </nav>
    </header>
  );
}

