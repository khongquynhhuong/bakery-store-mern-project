import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./EmployeeLayout.css";

const EmployeeLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/employee/login", { replace: true });
  };

  return (
    <div className="employee-layout">
      <header className="employee-layout__header">
        <div className="employee-layout__brand">
          <Link to="/employee">Employee</Link>
        </div>
        <nav className="employee-layout__nav">
          <NavLink
            to="/employee"
            end
            className="employee-layout__link"
          >
            Dashboard
          </NavLink>
          <NavLink to="/employee/orders" className="employee-layout__link">
            Orders
          </NavLink>
          <NavLink to="/employee/profile" className="employee-layout__link">
            My profile
          </NavLink>
          <button
            type="button"
            className="employee-layout__logout"
            onClick={handleLogout}
          >
            Log out
          </button>
        </nav>
      </header>
      <main className="employee-layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
