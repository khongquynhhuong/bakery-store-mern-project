import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { createOrder } from "../../services/api.js";
import "./CheckoutPage.css";

const SHIPPING_FEE = 25000;

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on delivery (COD)", icon: "💵" },
  { id: "transfer", label: "Bank transfer", icon: "🏦" },
  { id: "momo", label: "Momo e-wallet", icon: "📱" },
  { id: "vnpay", label: "VNPay", icon: "💳" },
];

function formatPrice(num) {
  return (num || 0).toLocaleString("vi-VN") + "đ";
}

const CheckoutPage = () => {
  const { items, getTotal } = useCart();
  const navigate = useNavigate();
  const subtotal = getTotal();
  const total = subtotal + SHIPPING_FEE;
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    note: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  if (items.length === 0) {
    navigate("/order", { replace: true });
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const payload = {
        fullName: form.fullName,
        phone: form.phone,
        email: form.email || "",
        address: form.address,
        ward: form.ward || "",
        district: form.district || "",
        city: form.city,
        note: form.note || "",
        paymentMethod,
        items: items.map((x) => ({
          productId: x.id,
          name: x.name,
          price: x.price,
          priceRaw: x.priceRaw,
          quantity: x.quantity,
        })),
        subtotal,
        shippingFee: SHIPPING_FEE,
        total,
      };
      const order = await createOrder(payload);
      navigate("/yourorder", { state: { orderId: order._id }, replace: true });
    } catch (err) {
      setSubmitError(err.message || "Order failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="checkout-page">
      <div className="checkout-page__inner">
        <h1 className="checkout-page__title">Checkout</h1>
        <Link to="/order" className="checkout-page__back">
          ← Back to cart
        </Link>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="checkout-form__section">
            <h2 className="checkout-form__heading">Shipping information</h2>
            <div className="checkout-form__grid">
              <label className="checkout-form__field">
                <span>Full name <em>*</em></span>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </label>
              <label className="checkout-form__field">
                <span>Phone number <em>*</em></span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                />
              </label>
              <label className="checkout-form__field checkout-form__field--full">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                />
              </label>
              <label className="checkout-form__field checkout-form__field--full">
                <span>Address <em>*</em></span>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  required
                />
              </label>
              <label className="checkout-form__field">
                <span>Ward</span>
                <input
                  type="text"
                  name="ward"
                  value={form.ward}
                  onChange={handleChange}
                  placeholder="Ward"
                />
              </label>
              <label className="checkout-form__field">
                <span>District</span>
                <input
                  type="text"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  placeholder="District"
                />
              </label>
              <label className="checkout-form__field">
                <span>City / Province <em>*</em></span>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Hanoi"
                  required
                />
              </label>
              <label className="checkout-form__field checkout-form__field--full">
                <span>Note</span>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  placeholder="Order notes..."
                  rows={3}
                />
              </label>
            </div>
          </section>

          <aside className="checkout-summary">
            <h2 className="checkout-summary__title">Order</h2>
            <div className="checkout-summary__row">
              <span>Subtotal ({items.length} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Shipping fee</span>
              <span>{formatPrice(SHIPPING_FEE)}</span>
            </div>
            <div className="checkout-summary__divider" />
            <div className="checkout-summary__row checkout-summary__total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <div className="checkout-payment">
              <h3 className="checkout-payment__title">Payment method</h3>
              {PAYMENT_METHODS.map((pm) => (
                <label key={pm.id} className="checkout-payment__option">
                  <input
                    type="radio"
                    name="payment"
                    value={pm.id}
                    checked={paymentMethod === pm.id}
                    onChange={() => setPaymentMethod(pm.id)}
                  />
                  <span className="checkout-payment__label">
                    <span className="checkout-payment__icon">{pm.icon}</span>
                    {pm.label}
                  </span>
                </label>
              ))}
            </div>

            {submitError && (
              <p className="checkout-summary__error">{submitError}</p>
            )}
            <button
              type="submit"
              className="checkout-summary__submit"
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Place order"}
            </button>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default CheckoutPage;
