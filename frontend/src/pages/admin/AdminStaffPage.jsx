import React, { useEffect, useState } from "react";
import { getAdminStaff, createAdminStaff, deleteAdminStaff, getAdminStaffPerformance } from "../../services/api.js";
import "./AdminStaffPage.css";

function formatPrice(num) {
  return (num || 0).toLocaleString("vi-VN") + "đ";
}

export default function AdminStaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ email: "", password: "", fullName: "", phone: "" });
  const [performance, setPerformance] = useState(null);

  async function load() {
    setLoading(true);
    try {
      const data = await getAdminStaff();
      setStaff(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    try {
      await createAdminStaff(form);
      setForm({ email: "", password: "", fullName: "", phone: "" });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleRemove(id) {
    if (!confirm("Remove this staff?")) return;
    try {
      await deleteAdminStaff(id);
      load();
      if (performance?.staff?.id === id) setPerformance(null);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleViewPerformance(id) {
    try {
      const data = await getAdminStaffPerformance(id);
      setPerformance(data);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <div className="staff-loading">Loading...</div>;

  return (
    <div className="staff-container">
      <h1 className="staff-title">Staff</h1>
      
      {error && <div className="staff-error">{error}</div>}

      <form className="staff-form" onSubmit={handleAdd}>
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required minLength={6} />
        <input type="text" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})} />
        <input type="text" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
        <button type="submit">Thêm nhân viên</button>
      </form>

      <div className="staff-list">
        {/* Header Row */}
        <div className="staff-row staff-row--head">
          <div className="col-email">Email</div>
          <div className="col-name">Name</div>
          <div className="col-phone">Phone</div>
          <div className="col-actions">Actions</div>
        </div>

        {/* Data Rows */}
        {staff.map((s) => (
          <div className="staff-row" key={s.id}>
            <div className="col-email">{s.email}</div>
            <div className="col-name">{s.fullName || "---"}</div>
            <div className="col-phone">{s.phone || "---"}</div>
            <div className="col-actions">
              <button type="button" className="btn-perf" onClick={() => handleViewPerformance(s.id)}>Performance</button>
              <button type="button" className="btn-del" onClick={() => handleRemove(s.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {staff.length === 0 && !loading && (
        <p className="staff-empty">No staff yet. Add one above.</p>
      )}

      {performance && (
        <div className="staff-perf">
          <h3>Performance: {performance.staff?.fullName || performance.staff?.email}</h3>
          <p>Orders: <strong>{performance.totalOrders}</strong> — Sales: <strong>{formatPrice(performance.totalSales)}</strong></p>
          <button type="button" className="staff-perf-close" onClick={() => setPerformance(null)}>Close</button>
        </div>
      )}
    </div>
  );
}