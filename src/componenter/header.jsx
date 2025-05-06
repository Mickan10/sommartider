import { NavLink, useLocation } from "react-router-dom";
import "./header.css";

export default function Header() {
  const location = useLocation();
  const isProdukterPage = location.pathname === "/produkter";

  return (
    <header className={`header ${isProdukterPage ? "not-sticky" : ""}`}>
      <h1 className="title">Sommartider</h1>
      <nav className="nav">
        <NavLink to="/" end>Hem</NavLink>
        <NavLink to="/produkter">Produkter</NavLink>
        <NavLink to="/kontakt">Om oss</NavLink>
      </nav>
    </header>
  );
}
