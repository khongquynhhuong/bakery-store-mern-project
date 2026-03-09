import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../services/api.js";
import { ORDER_STATUS_LABELS } from "../../constants/orderStatus.js";
import "./OrderStatusPage.css";

function formatPrice(num) {
  return (num || 0).toLocaleString("vi-VN") + "đ";
}

const OrderStatusPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId?.trim()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getOrderById(orderId.trim())
      .then((data) => {
        setOrder(data);
        setError(null);
      })
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <main className="order-status-page">
        <div className="order-status-page__inner">
          <p className="order-status-page__loading">Loading...</p>
        </div>
      </main>
    );
  }

  if (!orderId?.trim()) {
    return (
      <main className="order-status-page">
        <div className="order-status-page__inner">
          <h1 className="order-status-page__title">Track order</h1>
          <p className="order-status-page__text">Enter your order ID to view status.</p>
          <form
            className="order-status-page__form"
            onSubmit={(e) => {
              e.preventDefault();
              const id = e.currentTarget.orderId.value?.trim();
              if (id) navigate(`/order-status/${encodeURIComponent(id)}`);
            }}
          >
            <input
              type="text"
              name="orderId"
              placeholder="Order ID"
              className="order-status-page__input"
            />
            <button type="submit" className="order-status-page__btn">Search</button>
          </form>
          <Link to="/" className="order-status-page__back">← Back to home</Link>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="order-status-page">
        <div className="order-status-page__inner">
          <h1 className="order-status-page__title">Track order</h1>
          <p className="order-status-page__error">
            {error || "No order found with this ID."}
          </p>
          <Link to="/order-status" className="order-status-page__back">← Enter another ID</Link>
          <Link to="/" className="order-status-page__back" style={{ display: "block", marginTop: 8 }}>Back to home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="order-status-page">
      <div className="order-status-page__inner">
        <h1 className="order-status-page__title">Order status</h1>
        <p className="order-status-page__id">Order ID: <strong>{order._id}</strong></p>
        <div className="order-status-page__badge">
          {ORDER_STATUS_LABELS[order.status] || order.status}
        </div>

        <section className="order-status-page__section">
          <h2>Shipping information</h2>
          <p>{order.fullName} · {order.phone}</p>
          <p>{order.address}, {order.ward && order.ward + ", "}{order.district && order.district + ", "}{order.city}</p>
          {order.note && <p className="order-status-page__note">Note: {order.note}</p>}
        </section>

        <section className="order-status-page__section">
          <h2>Order</h2>
          <ul className="order-status-page__items">
            {order.items?.map((item, i) => (
              <li key={i}>
                {item.name} × {item.quantity} — {formatPrice(item.priceRaw * item.quantity)}
              </li>
            ))}
          </ul>
          <p className="order-status-page__total">
            Total: <strong>{formatPrice(order.total)}</strong>
          </p>
        </section>

        <Link to="/" className="order-status-page__back">← Back to home</Link>
      </div>
    </main>
  );
};

export default OrderStatusPage;
