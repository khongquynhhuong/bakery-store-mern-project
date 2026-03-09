import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MenuHome.css";
import banhImg from "../../assets/banh.png";
import { getCakes } from "../../services/api.js";
import { useCart } from "../../context/CartContext.jsx";
import toast from "react-hot-toast";

const ARROW_RIGHT = "→";
const CARET_DOWN = "⌄";

const CATEGORY_ORDER = [
  "Tin box cake",
  "Birthday Cake",
  "Mousse",
  "Cream Choux",
  "Cupcake",
];

const CATEGORY_TO_SLUG = {
  "Tin box cake": "tin-box-cake",
  "Birthday Cake": "birthday-cake",
  Mousse: "mousse",
  "Cream Choux": "cream-choux",
  Cupcake: "cupcake",
};

const CAKES_PER_CATEGORY = 4;

function groupCakesByCategory(cakes) {
  const order = [...CATEGORY_ORDER];
  const seen = new Set(order);
  cakes.forEach((c) => {
    const key = c.category || "Other";
    if (!seen.has(key)) {
      seen.add(key);
      order.push(key);
    }
  });
  const map = new Map();
  order.forEach((name) => map.set(name, []));
  cakes.forEach((cake) => {
    const key = cake.category || "Other";
    map.get(key).push(cake);
  });
  return Array.from(map.entries()).filter(([, products]) => products.length > 0);
}

const MenuHome = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    getCakes()
      .then((data) => {
        if (!cancelled) {
          const grouped = groupCakesByCategory(data);
          setCategories(grouped);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="menu-home">
        <h2 className="menu-home__title">OUR MENU</h2>
        <p className="menu-home__loading">Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-home">
        <h2 className="menu-home__title">OUR MENU</h2>
        <p className="menu-home__error">Cannot load menu. Please check backend and try again.</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="menu-home">
        <h2 className="menu-home__title">OUR MENU</h2>
        <p className="menu-home__empty">No cakes in database yet. Add cakes via API or MongoDB Atlas.</p>
      </div>
    );
  }

  return (
    <div className="menu-home">
      <h2 className="menu-home__title">OUR MENU</h2>

      {categories.map(([categoryName, products]) => (
        <section key={categoryName} className="menu-home__category">
          <div className="menu-home__category-header">
            <span className="menu-home__category-arrow">{ARROW_RIGHT}</span>
            <h3 className="menu-home__category-name">{categoryName}</h3>
          </div>

          <div className="menu-home__cards">
            {products.slice(0, CAKES_PER_CATEGORY).map((product) => (
              <div key={product._id} className="menu-home__card">
                <div className="menu-home__card-img-wrap">
                  <img
                    src={product.image || banhImg}
                    alt={product.name}
                    className="menu-home__card-img"
                  />
                </div>
                <p className="menu-home__card-name">{product.name}</p>
                <p className="menu-home__card-price">
                  Price: {product.price}
                </p>
                <button
                  type="button"
                  className="menu-home__card-btn"
                  onClick={() => {
                    addToCart(product);
                    toast.success("Added to cart!");
                  }}
                >
                  Order now
                  <span className="menu-home__card-btn-arrow">
                    {ARROW_RIGHT}
                  </span>
                </button>
              </div>
            ))}
          </div>

          <Link
            to={`/menu/${
              CATEGORY_TO_SLUG[categoryName] ||
              encodeURIComponent(categoryName.toLowerCase().replace(/\s+/g, "-"))
            }`}
            className="menu-home__see-more"
          >
            See more{" "}
            <span className="menu-home__caret">{CARET_DOWN}</span>
          </Link>
        </section>
      ))}
    </div>
  );
};

export default MenuHome;
