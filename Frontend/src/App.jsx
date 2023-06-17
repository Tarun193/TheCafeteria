// Required Imports.
import "./css/styles.css";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/ProductPage/ProductPage";
import LoginPage from "./Pages/Login/Login";
import Layout from "./Components/Layout";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import {
  getAuthToken,
  getuserInfo,
  isLoggedIn,
  refreshToken,
} from "./Features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./Pages/AddProduct/AddProduct";
import {
  selectProductsStatus,
  fetchProducts,
} from "./Features/Products/ProductSlice.jsx";
import { selectBrandStatus, fetchBrands } from "./Features/Brand/BrandSlice";
import {
  fetchCart,
  resetCart,
  selectCartStatus,
} from "./Features/cartSlice/cartSlice";

import PrivateAdminRoutes from "./utils/PrivateRoute/PrivateAdminRoute";
import PrivateUserRoutes from "./utils/PrivateRoute/PrivateUserRoute";
import EditProduct from "./Pages/EditProduct/EditProduct";
import { useEffect, useState } from "react";
import Products from "./Pages/Products/Products";
import CartPage from "./Pages/Cart/CartPage";
import AddressPage from "./Pages/AddressPage.jsx/AddressPage";

function App() {
  const dispatch = useDispatch();
  const productStatus = useSelector(selectProductsStatus);
  const brandStatus = useSelector(selectBrandStatus);
  const cartStatus = useSelector(selectCartStatus);
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector(getuserInfo);
  const loggedIn = useSelector(isLoggedIn);
  const access = useSelector(getAuthToken)?.access;
  useEffect(() => {
    if (loading) {
      const refresh = localStorage.getItem("refresh");
      if (refresh && !loggedIn) {
        dispatch(refreshToken());
      }
      if (productStatus === "idle") {
        dispatch(fetchProducts());
      }
      if (brandStatus === "idle") {
        dispatch(fetchBrands());
      }
      setTimeout(() => setLoading(false), 500);
    }
    if (cartStatus === "idle" && loggedIn) {
      console.log("test");
      dispatch(fetchCart({ id: userInfo?.user_id, access: access }));
    }
    if (!loggedIn) {
      dispatch(resetCart());
    }
  }, [loading, loggedIn]);
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="Login" element={<LoginPage />} />
              <Route path="Signup" element={<SignUpPage />} />
              <Route path="products">
                <Route index element={<Products />} />
                <Route path=":id" element={<ProductPage />} />
              </Route>
              <Route path="admin" element={<PrivateAdminRoutes />}>
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="EditProduct/:id" element={<EditProduct />} />
              </Route>
              <Route path="user" element={<PrivateUserRoutes />}>
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout/address" element={<AddressPage />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
