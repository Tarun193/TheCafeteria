import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getuserInfo } from "../../Features/auth/authSlice";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { pathname } = useLocation();
  const [isValidToken, setIsValidToken] = useState(true);
  const userData = useSelector(getuserInfo);

  useEffect(() => {
    // on initial mount or route change, check token
    if (userData) {
      setIsValidToken(!!userData.admin);
    } else {
      setIsValidToken(false);
    }
  }, [pathname, userData]);

  return isValidToken ? <Outlet /> : <Navigate to="/Login" replace />;
};

export default PrivateRoutes;
