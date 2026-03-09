import React, { useState } from "react";
import { getAdminReportsSales } from "../../services/api.js";
import "./AdminReportsPage.css";

export default function AdminReportsPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [groupBy, setGroupBy] = useState("day");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminReportsSales(from || undefined, to || undefined, groupBy);
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function formatPrice(num) {
    return (num || 0).toLocaleString("vi-VN") + "đ";
  }

  return (
    <div className="admin-reports">
      <h1 className="admin-reports__title">Sales reports</h1>
      <div className="admin-reports__filters">
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
          <option value="day">By day</option>
          <option value="week">By week</option>
        </select>
        <button type="button" onClick={load} disabled={loading}>{loading ? "..." : "Apply"}</button>
      </div>
      {error && <p className="admin-reports__error">{error}</p>}
      {data && (
        <>
          <p className="admin-reports__summary">
            Total revenue: <strong>{formatPrice(data.totalRevenue)}</strong> — Orders: <strong>{data.totalOrders}</strong>
          </p>
          <table className="admin-reports__table">
            <thead><tr><th>Date</th><th>Revenue</th><th>Orders</th></tr></thead>
            <tbody>
              {data.summary.map(function(row) { return (<tr key={row.date}><td>{row.date}</td><td>{formatPrice(row.revenue)}</td><td>{row.count}</td></tr>); })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
