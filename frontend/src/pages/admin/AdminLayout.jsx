import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./AdminLayout.css";

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      <header className="admin-layout__header">
        <div className="admin-layout__brand"><Link to="/admin">Admin</Link></div>
        <nav className="admin-layout__nav">
          <NavLink to="/admin" end className="admin-layout__link">Dashboard</NavLink>
          <NavLink to="/admin/products" className="admin-layout__link">Products</NavLink>
          <NavLink to="/admin/reports" className="admin-layout__link">Reports</NavLink>
          <NavLink to="/admin/staff" className="admin-layout__link">Staff</NavLink>
          <button type="button" className="admin-layout__logout" onClick={() => { logout(); navigate("/admin/login", { replace: true }); }}>Log out</button>
        </nav>
      </header>
      <main className="admin-layout__main"><Outlet /></main>
    </div>
  );
};

export default AdminLayout;
