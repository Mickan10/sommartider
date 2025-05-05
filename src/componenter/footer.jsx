import React from "react";
import { NavLink } from "react-router-dom";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Om oss</p>
        <p>Kontakta oss</p>
        <NavLink to="/admin" className="admin-link">
          Admin
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
