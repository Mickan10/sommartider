import { Link } from 'react-router'; 
import "./header.css";

export default function Header() {
  return (
    <header>
      <h1 className="title">Sommartider.</h1>
      <nav>
        <Link to="/">Hem</Link>
        <Link to="/produkter">Produkter</Link>
        <Link to="/about">Om oss</Link>
      </nav>
    </header>
  );
}

