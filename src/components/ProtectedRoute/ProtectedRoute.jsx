import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (sessionStorage.getItem("isLoggedIn") !== "1") {
    return <Navigate to={"/"} replace />;
  }
  return children;
}
