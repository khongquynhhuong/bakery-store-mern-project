import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "../home/MenuHome.css";
import banhImg from "../../assets/banh.png";
import { searchCakes } from "../../services/api.js";
import { useCart } from "../../context/CartContext.jsx";
import toast from "react-hot-toast";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    if (!q.trim()) {
      setCakes([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    searchCakes(q)
      .then((data) => {
        if (!cancelled) setCakes(Array.isArray(data) ? data : []);
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
  }, [q]);

  if (!q.trim()) {
    return (
      <div className="menu-home">
        <h2 className="menu-home__title">Find your cake</h2>
        <p className="menu-home__empty">Enter a cake name in the search box in the navbar.</p>
        <Link to="/" className="menu-home__see-more">
          ← Back to home
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="menu-home">
        <h2 className="menu-home__title">Search: &quot;{q}&quot;</h2>
        <p className="menu-home__loading">Searching...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-home">
        <h2 className="menu-home__title">Search: &quot;{q}&quot;</h2>
        <p className="menu-home__error">Search failed. Please try again.</p>
        <Link to="/" className="menu-home__see-more">
          ← Back to home
        </Link>
      </div>
    );
  }

  if (cakes.length === 0) {
    return (
      <div className="menu-home">
        <h2 className="menu-home__title">Search: &quot;{q}&quot;</h2>
        <p className="menu-home__empty">No cakes found.</p>
        <Link to="/" className="menu-home__see-more">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="menu-home">
      <h2 className="menu-home__title">Search results: &quot;{q}&quot;</h2>
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

export default SearchPage;
