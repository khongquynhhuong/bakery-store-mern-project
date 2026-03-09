import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import banhImg from "../../assets/banh.png";
import "./OrderPage.css";

function formatPrice(num) {
  return (num || 0).toLocaleString("vi-VN") + "đ";
}

const OrderPage = () => {
  const { items, updateQuantity, removeFromCart, getTotal } = useCart();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <main className="order-page">
        <div className="order-page__inner">
          <h1 className="order-page__title">Cart</h1>
          <p className="order-page__empty">
            Your cart is empty. <Link to="/">Browse cakes</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="order-page">
      <div className="order-page__inner">
        <h1 className="order-page__title">Cart</h1>

        <div className="order-page__content">
          <section className="order-list">
            {items.map((item) => {
              const lineTotal = item.priceRaw * item.quantity;
              return (
                <div key={item.id} className="order-row">
                  <div className="order-row__img">
                    <img
                      src={item.image || banhImg}
                      alt={item.name}
                      className="order-row__img-el"
                    />
                  </div>
                  <div className="order-row__info">
                    <h3 className="order-row__name">{item.name}</h3>
                    <p className="order-row__price">{item.price}</p>
                  </div>
                  <div className="order-row__qty">
                    <button
                      type="button"
                      className="order-row__qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="order-row__qty-num">{item.quantity}</span>
                    <button
                      type="button"
                      className="order-row__qty-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="order-row__line-total">
                    {formatPrice(lineTotal)}
                  </div>
                  <button
                    type="button"
                    className="order-row__remove"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove from cart"
                    aria-label="Remove from cart"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </section>

          <aside className="order-summary">
            <h2 className="order-summary__title">Total</h2>
            <p className="order-summary__total">
              <span className="order-summary__label">Total:</span>
              <strong className="order-summary__value">{formatPrice(total)}</strong>
            </p>
            <Link to="/checkout" className="order-summary__checkout">
              Checkout
            </Link>
            <Link to="/" className="order-summary__continue">
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default OrderPage;
