import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./AccountPage.css";

const AccountPage = () => {
  const { user } = useAuth();
  const orders = [];

  return (
    <main className="account-page">
      <div className="account-page__inner">
        <h1 className="account-page__title">Account</h1>

        <div className="account-page__grid">
          <section className="account-section">
            <h2 className="account-section__title">Order history</h2>
            <div className="account-section__body">
              {orders.length === 0 ? (
                <p className="account-section__empty">
                  No orders yet. <Link to="/">Start shopping</Link>
                </p>
              ) : (
                <ul className="order-list">
                  {orders.map((o) => (
                    <li key={o.id} className="order-list__item">
                      {o.id} – {o.date}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="account-section">
            <h2 className="account-section__title">Account information</h2>
            <div className="account-section__body account-info">
              <div className="account-info__row">
                <span className="account-info__label">Email</span>
                <span className="account-info__value">{user?.email || "—"}</span>
              </div>
              <div className="account-info__row">
                <span className="account-info__label">Full name</span>
                <span className="account-info__value">{user?.fullName || "—"}</span>
              </div>
              <div className="account-info__row">
                <span className="account-info__label">Password</span>
                <span className="account-info__value account-info__value--masked">••••••••</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
