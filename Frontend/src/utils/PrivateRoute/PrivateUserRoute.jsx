import { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../../Features/auth/authSlice";
import { useSelector } from "react-redux";

const PrivateUserRoutes = () => {
  const { pathname } = useLocation();
  const [isValidToken, setIsValidToken] = useState();
  const loggedIn = useSelector(isLoggedIn);

  useEffect(() => {
    // on initial mount or route change, check token
    if (loggedIn) {
      setIsValidToken(!!loggedIn);
    } else {
      setIsValidToken(false);
    }
  }, [pathname, loggedIn]);

  if (isValidToken === undefined) {
    return <h1></h1>; // or loading indicator/spinner/etc
  }

  return isValidToken ? <Outlet /> : <Navigate to="/Login" replace />;
};

export default PrivateUserRoutes;
