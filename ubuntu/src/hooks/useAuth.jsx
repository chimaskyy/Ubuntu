import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function useAuth() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate("/sign-up"); // Redirect to signup page
    }
  }, [user, navigate]);

  return user;
}
export default useAuth;
