import { NavLink } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <h1 className="title">Sommartider</h1>
      <nav className="nav">
        <NavLink to="/" end>
          Hem
        </NavLink>
        <NavLink to="/produkter">
          Produkter
        </NavLink>
        <NavLink to="/kontakt">
          Kontakt
        </NavLink>
      </nav>
    </header>
  );
}
