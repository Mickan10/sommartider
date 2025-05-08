import React from "react";
import { NavLink } from "react-router-dom";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p><strong></strong> Vi älskar sommarleksaker och glädje i solen!</p>
          <p><strong>Kontakt:</strong> info@sommartid.se | 070-123 45 67</p>
        </div>

        <NavLink to="/admin" className="admin-button" title="Endast för personal">
            <p>Jobbar du här?</p>
          </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
