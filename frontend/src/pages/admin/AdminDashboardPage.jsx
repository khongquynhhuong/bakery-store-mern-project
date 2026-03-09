import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard__title">Dashboard</h1>
      <p className="admin-dashboard__lead">Manage products, view reports, and staff.</p>
      <div className="admin-dashboard__links">
        <Link to="/admin/products" className="admin-dashboard__link">Products</Link>
        <Link to="/admin/reports" className="admin-dashboard__link">Reports</Link>
        <Link to="/admin/staff" className="admin-dashboard__link">Staff</Link>
      </div>
    </div>
  );
}
