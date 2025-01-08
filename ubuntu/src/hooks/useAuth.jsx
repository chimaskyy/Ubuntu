import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function useAuth() {
  const history = useHistory();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);
  return user;
}
