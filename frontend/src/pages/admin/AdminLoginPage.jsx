import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "../signin/signIn.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const u = await login(email, password);
      if (u.role === "admin") navigate("/admin", { replace: true });
      else setError("Admin access only.");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">Admin login</h1>
        <p className="auth-card__subtitle">Administrators only</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <p className="auth-form__error">{error}</p>}
          <div className="auth-form__field">
            <input type="email" placeholder="Email" className="auth-form__input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="auth-form__field">
            <input type="password" placeholder="Password" className="auth-form__input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="auth-form__submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        </form>
        <p className="auth-card__switch"><a href="/">Back to store</a></p>
      </div>
    </div>
  );
}
