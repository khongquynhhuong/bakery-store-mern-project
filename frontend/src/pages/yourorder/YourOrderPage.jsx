import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import "./YourOrderPage.css";

const YourOrderPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || null;
  const { clearCart } = useCart();

  useEffect(() => {
    if (orderId) clearCart();
  }, [orderId, clearCart]);

  return (
    <main className="yourorder-page">
      <div className="yourorder-page__card">
        <div className="yourorder-page__icon">✓</div>
        <h1 className="yourorder-page__title">Your order is successful</h1>
        <p className="yourorder-page__subtitle">
          Thank you for your order. We will contact you to confirm as soon as possible.
        </p>
        {orderId && (
          <div className="yourorder-page__id">
            <span className="yourorder-page__id-label">Order ID:</span>
            <strong className="yourorder-page__id-value">{orderId}</strong>
            <p className="yourorder-page__id-hint">
              Use this ID in the &quot;Enter Order&apos;s ID&quot; field in the menu bar to track your order status.
            </p>
          </div>
        )}
        <div className="yourorder-page__actions">
          <Link to="/order-status" className="yourorder-page__link">
            Track another order
          </Link>
          <Link to="/" className="yourorder-page__link yourorder-page__link--primary">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default YourOrderPage;
