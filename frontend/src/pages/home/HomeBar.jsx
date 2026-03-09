import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeBar.css";
import { getCakes } from "../../services/api.js";

const HomeBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCakes()
      .then((data) => {
        const uniqueCategories = [...new Set(data.map((cake) => cake.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  const createSlug = (name) =>
    encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));

  return (
    <nav className="mainNav">
      <Link to="/" className="mainNav__link">
        Home
      </Link>

      <div className="mainNav__item mainNav__item--has-dropdown">
        <button type="button" className="mainNav__link mainNav__link--button">
          Menu
        </button>
        <div className="mainNav__dropdown">
          {categories.map((catName) => (
            <Link
              key={catName}
              to={`/menu/${createSlug(catName)}`}
              className="mainNav__dropdown-item"
            >
              {catName}
            </Link>
          ))}
        </div>
      </div>

      <Link to="/about" className="mainNav__link">
        About Us
      </Link>
      <Link to="/policy" className="mainNav__link">
        Policy
      </Link>
      <Link to="/contact" className="mainNav__link">
        Contact
      </Link>
    </nav>
  );
};

export default HomeBar;