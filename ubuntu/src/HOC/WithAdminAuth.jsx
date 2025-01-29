
import { useSelector } from "react-redux";
import {  Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function WithAdminAuth({ children }) {
  const { user, isLoading } = useSelector((state) => state.user);


  // Show a loading state while checking user data
  if (isLoading || user?.loading) return <div>Loading...</div>;

  // Check if the user's role includes "admin"
   if (user?.role?.includes("admin")) {
     return children;
   }
  return <Navigate to="/" />;
}

export default WithAdminAuth;

