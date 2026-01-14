import { Navigate } from "react-router-dom";

export default function UserRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "doctor") {
    return <Navigate to="/Register/LoginPage" />;
  }

  return children; 
}

