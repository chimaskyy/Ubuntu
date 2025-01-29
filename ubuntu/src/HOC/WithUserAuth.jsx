import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function WithUserAuth({ children }) {
  const user = useAuth();
  if (!user) return <Navigate to="/sign-up" />;
  return children;
}



