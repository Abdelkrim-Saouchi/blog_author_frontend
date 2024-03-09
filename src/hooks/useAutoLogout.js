import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

const useAutoLogout = () => {
  const setToken = useStore((state) => state.setToken);
  const navigate = useNavigate();

  useEffect(() => {
    let expiresIn = localStorage.getItem("author-expiresIn");
    if (expiresIn) {
      expiresIn = Number(expiresIn);
      const now = Date.now();
      const remainingTime = expiresIn - now;
      if (remainingTime < 0) {
        localStorage.removeItem("author-jwt-token");
        localStorage.removeItem("author-expiresIn");
        setToken(null);
        navigate("/login");
      }
    }
  }, [setToken, navigate]);
};
export default useAutoLogout;
