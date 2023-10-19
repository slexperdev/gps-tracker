import { Navigate } from "react-router-dom";
import useToken from "./Hooks/UseToken";

export const ProtectedRoutes = ({ children }) => {
  const { token } = useToken();

  if (token === null || token === "") {
    return <Navigate to="/login" replace />;
  }
  return children;
};
