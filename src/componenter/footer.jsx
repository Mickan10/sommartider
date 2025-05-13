import React from "react";
import { Link } from "react-router";
import "./footer.css";
import instagramIcon from "../asse/instagram.png";
import facebookIcon from "../asse/facebook.png";

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
            <p><strong>Följ oss:</strong></p>
            <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src={instagramIcon} alt="Instagram" width="84" height="84" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={facebookIcon} alt="Facebook" width="64" height="64" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
