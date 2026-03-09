import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/logo.png";
import thongBao from "../assets/da_thong_bao.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <div className="footer__brand">
            <img src={logo} alt="Sweet Bakery logo" className="footer__logo" />
            <span className="footer__brand-name">Sweet Bakery</span>
          </div>
          <p className="footer__text">
            No 1 Dai Co Viet, Hai Ba Trung, Ha Noi, Vietnam
            <br />
            +84 12345678
            <br />
            sweetbakery@gmail.com
            <br />
            Opening hours: 7am - 11pm
          </p>
        </div>

        <div className="footer__center">
          <div className="footer__column">
            <Link to="/" className="footer__link">
              Home
            </Link>
            <Link to="/about" className="footer__link">
              About Us
            </Link>
            <Link to="/contact" className="footer__link">
              Contact
            </Link>
            <Link to="/policy" className="footer__link">
              Policy
            </Link>
          </div>

          <div className="footer__column">
            <a href="#facebook" className="footer__link">
              Facebook
            </a>
            <a href="#instagram" className="footer__link">
              Instagram
            </a>
            <a href="#tiktok" className="footer__link">
              Tiktok
            </a>
          </div>
        </div>

        <div className="footer__right">
          <img
            src={thongBao}
            alt="Ministry of Industry and Trade registration badge"
            className="footer__badge"
          />
        </div>
      </div>

      <div className="footer__bottom">
        © 2025 Sweet Bakery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

