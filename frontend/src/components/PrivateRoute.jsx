import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function PrivateRoute({ children, requireCustomer }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/signin" state={{ from: location }} replace />;
  if (requireCustomer && user.role !== "customer") return <Navigate to="/" replace />;
  return children;
}
