import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function EmployeeRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isStaff = user?.role === "employee" || user?.role === "admin";

  if (loading) return null;
  if (!user || !isStaff) return <Navigate to="/employee/login" state={{ from: location }} replace />;
  return children;
}
