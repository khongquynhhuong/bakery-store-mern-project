import React, { useEffect, useState } from "react";
import { getEmployeesMe, patchEmployeesMe } from "../../services/api.js";
import "./EmployeeProfilePage.css";

const EmployeeProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", password: "" });

  useEffect(() => {
    getEmployeesMe()
      .then((data) => {
        setProfile(data);
        setForm({ fullName: data.fullName || "", phone: data.phone || "", password: "" });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const payload = { fullName: form.fullName, phone: form.phone };
      if (form.password && form.password.length >= 6) payload.password = form.password;
      const updated = await patchEmployeesMe(payload);
      setProfile(updated);
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="employee-profile"><p>Loading...</p></div>;
  if (error && !profile) return <div className="employee-profile"><p className="employee-profile__error">{error}</p></div>;

  return (
    <div className="employee-profile">
      <h1 className="employee-profile__title">My profile</h1>
      <form className="employee-profile__form" onSubmit={handleSubmit}>
        {error && <p className="employee-profile__error">{error}</p>}
        <label className="employee-profile__field">
          <span>Email</span>
          <input type="email" value={profile?.email || ""} readOnly disabled className="employee-profile__input--readonly" />
        </label>
        <label className="employee-profile__field">
          <span>Full name</span>
          <input type="text" name="fullName" value={form.fullName} onChange={handleChange} className="employee-profile__input" />
        </label>
        <label className="employee-profile__field">
          <span>Phone</span>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} className="employee-profile__input" />
        </label>
        <label className="employee-profile__field">
          <span>New password (leave blank to keep)</span>
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" className="employee-profile__input" minLength={6} />
        </label>
        <button type="submit" className="employee-profile__submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeProfilePage;
