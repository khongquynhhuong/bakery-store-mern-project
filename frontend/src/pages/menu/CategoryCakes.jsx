import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../home/MenuHome.css";
import banhImg from "../../assets/banh.png";
import { getCakesByCategory } from "../../services/api.js";
import { useCart } from "../../context/CartContext.jsx";
import toast from "react-hot-toast";

const CATEGORY_SLUG_TO_NAME = {
  "tin-box-cake": "Tin box cake",
  "birthday-cake": "Birthday Cake",
  mousse: "Mousse",
  "cream-choux": "Cream Choux",
  cupcake: "Cupcake",
};

const CategoryCakes = () => {
  const { categorySlug } = useParams();
  const categoryName = CATEGORY_SLUG_TO_NAME[categorySlug] ||
    categorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!categoryName) {
      setLoading(false);
      setError("Unknown category");
      return;
    }

    let cancelled = false;
    getCakesByCategory(categoryName)
      .then((data) => {
        if (!cancelled) setCakes(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categoryName]);

  if (!categoryName) {
    return (
      <div className="menu-home">
        <h2 className="menu-home__title">OUR MENU</h2>
        <p className="menu-home__error">Category not found.</p>
        <Link to="/" className="menu-home__see-more">
          Back to home
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="menu-home">
        <h2 className="menu-home__title">{categoryName}</h2>
        <p className="menu-home__loading">Loading cakes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-home">
        <h2 className="menu-home__title">{categoryName}</h2>
        <p className="menu-home__error">
          Cannot load cakes. Please try again later.
        </p>
        <Link to="/" className="menu-home__see-more">
          Back to home
        </Link>
      </div>
    );
  }

  if (cakes.length === 0) {
    return (
      <div className="menu-home">
        <h2 className="menu-home__title">{categoryName}</h2>
        <p className="menu-home__empty">No cakes in this category yet.</p>
        <Link to="/" className="menu-home__see-more">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="menu-home">
      <h2 className="menu-home__title">{categoryName}</h2>
      <div className="menu-home__category">
        <div className="menu-home__cards">
          {cakes.map((cake) => (
            <div key={cake._id} className="menu-home__card">
              <div className="menu-home__card-img-wrap">
                <img
                  src={cake.image || banhImg}
                  alt={cake.name}
                  className="menu-home__card-img"
                />
              </div>
              <p className="menu-home__card-name">{cake.name}</p>
              <p className="menu-home__card-price">Price: {cake.price}</p>
              <button
                type="button"
                className="menu-home__card-btn"
                onClick={() => {
                  addToCart(cake);
                  toast.success("Added to cart!");
                }}
              >
                Order now
              </button>
            </div>
          ))}
        </div>
      </div>
      <Link to="/" className="menu-home__see-more">
        ← Back to home
      </Link>
    </div>
  );
};

export default CategoryCakes;