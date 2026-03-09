import React from "react";
import { Link } from "react-router-dom";
import "./EmployeeDashboardPage.css";

const EmployeeDashboardPage = () => {
  return (
    <div className="employee-dashboard">
      <h1 className="employee-dashboard__title">Dashboard</h1>
      <p className="employee-dashboard__lead">
        Manage orders and update statuses from the Orders page.
      </p>
      <div className="employee-dashboard__actions">
        <Link to="/employee/orders" className="employee-dashboard__btn">
          View all orders
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;
