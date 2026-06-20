import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userStr = localStorage.getItem("user");
  
  if (!userStr) {
    // User is not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is logged in, render the protected component
  return children;
};

export default ProtectedRoute;
