import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireAuth }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (requireAuth && !isLoggedIn) {
    return <Navigate to="/Register/LoginPage" />;
  }

  if (!requireAuth && isLoggedIn) {
    return <Navigate to="/Profile" />;
  }

  return children;
};

export default ProtectedRoute;

