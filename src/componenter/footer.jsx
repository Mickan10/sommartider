import React from "react";
import { Link } from "react-router";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section left">
          <Link to="/admin" className="admin-button" title="Endast för personal">
            <p>Jobbar du här?</p>
          </Link>
        </div>

        <div className="footer-section center">
          <p><strong>Kontakt:</strong></p>
          <p>info@sommartid.se<br />070-123 45 67</p>
        </div>

        <div className="footer-section right">
            <p>Följ oss:</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="TikTok">Tiktok</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
