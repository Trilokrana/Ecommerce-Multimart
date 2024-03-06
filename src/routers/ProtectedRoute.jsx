import React from "react";
import useAuth from "../custom-hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const Navigate = useNavigate();
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
