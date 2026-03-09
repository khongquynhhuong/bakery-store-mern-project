import React, { useState } from "react";
import logo from "../assets/logo.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="6" strokeWidth="2" />
    <line x1="15" y1="15" x2="20" y2="20" strokeWidth="2" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="9" r="3.5" strokeWidth="1.8" />
    <path
      d="M6 19c0-2.5 2.2-4.5 6-4.5s6 2 6 4.5"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const UserPlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    {/* User icon (Sign in) */}
    <circle cx="12" cy="9" r="3.5" strokeWidth="1.8" />
    <path
      d="M6 19c0-2.5 2.2-4.5 6-4.5s6 2 6 4.5"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Plus icon for Sign up */}
    <circle cx="18" cy="7" r="2.2" strokeWidth="1.6" />
    <path d="M18 5.8v2.4" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M16.8 7h2.4" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M5 6h2l1.2 10h9.6L19 9H8"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="20" r="1.2" strokeWidth="1.4" />
    <circle cx="17" cy="20" r="1.2" strokeWidth="1.4" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getCount } = useCart();
  const cartCount = getCount();
  const [trackOrderId, setTrackOrderId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTrackOrder = () => {
    const id = trackOrderId?.trim();
    if (id) navigate(`/order-status/${encodeURIComponent(id)}`);
  };

  const handleSearch = () => {
    const q = searchQuery?.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="hdr">
      <div className="container">
        <div className="hdr__top">
          {/* Logo */}
          <div className="hdr__brand">
            <Link to="/"><img src={logo} alt="Sweet Bakery" /></Link>
          </div>

          {/* Search */}
          <div className="hdr__search">
            <input
              type="text"
              placeholder="Find your cake"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button type="button" onClick={handleSearch}>
              <SearchIcon />
            </button>
          </div>

          {/* Track order */}
          <div className="hdr__track">
            <input
              type="text"
              placeholder="Enter Order's ID"
              value={trackOrderId}
              onChange={(e) => setTrackOrderId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrackOrder()}
            />
            <button type="button" onClick={handleTrackOrder}>
              <SearchIcon />
            </button>
          </div>

          {/* Actions */}
          <div className="hdr__actions">
            {user ? (
              <>
                {user.role === "customer" && (
                  <button
                    className="hdr__action-item"
                    type="button"
                    onClick={() => navigate("/account")}
                    title="Account"
                  >
                    <span className="hdr__icon-circle">
                      <UserIcon />
                    </span>
                    <span>Account</span>
                  </button>
                )}
                {(user.role === "employee" || user.role === "admin") && (
                  <Link to="/employee" className="hdr__action-item" style={{ textDecoration: "none", color: "inherit", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <span className="hdr__icon-circle"><UserIcon /></span>
                    <span>Employee</span>
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link to="/admin" className="hdr__action-item" style={{ textDecoration: "none", color: "inherit", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <span className="hdr__icon-circle"><UserIcon /></span>
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  className="hdr__action-item"
                  type="button"
                  onClick={() => logout()}
                  title="Sign out"
                >
                  <span className="hdr__icon-circle">
                    <LogoutIcon />
                  </span>
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="hdr__action-item"
                  type="button"
                  onClick={() => navigate("/signin")}
                >
                  <span className="hdr__icon-circle">
                    <UserIcon />
                  </span>
                  <span>Sign in</span>
                </button>
                <button
                  className="hdr__action-item"
                  type="button"
                  onClick={() => navigate("/signup")}
                >
                  <span className="hdr__icon-circle">
                    <UserPlusIcon />
                  </span>
                  <span>Sign up</span>
                </button>
              </>
            )}

            <button
              className="hdr__action-item"
              type="button"
              onClick={() => navigate("/order")}
              title="Cart"
            >
              <span className="hdr__icon-circle hdr__icon-circle--cart">
                <CartIcon />
                {cartCount > 0 && (
                  <span className="hdr__cart-badge">{cartCount}</span>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

