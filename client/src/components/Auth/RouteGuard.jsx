import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const RouteGuard = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  if (!isAuthenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (isAuthenticated && location.pathname.includes("/auth")) {
    if (user?.role === "instructor") {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  if (
    isAuthenticated &&
    user?.role !== "instructor" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/" />;
  }

  if (
    isAuthenticated &&
    user?.role === "instructor" &&
    location.pathname.includes("/")
  ) {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
};

export default RouteGuard;
