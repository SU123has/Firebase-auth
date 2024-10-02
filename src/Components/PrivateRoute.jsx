import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
  //renders child routes only if currentUser is authenticated
};

export default PrivateRoute;

//need to create a wrapper for the Route component within PrivateRoute and ensures it returns a valid Route component
