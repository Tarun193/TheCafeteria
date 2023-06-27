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
import OrderPlaced from "./Pages/OrderPlaced";
import {
  fetchAddresses,
  selectAddressStatus,
} from "./Features/addressSlice/addressSlice";

import Loading from "react-fullscreen-loading";
import MyOrders from "./Pages/MyOrders/MyOrders";
import {
  fetchOrders,
  selectOrdersStatus,
} from "./Features/orderSlice/orderSlice";

function App() {
  const dispatch = useDispatch();
  const productStatus = useSelector(selectProductsStatus);
  const brandStatus = useSelector(selectBrandStatus);
  const cartStatus = useSelector(selectCartStatus);
  const addressStatus = useSelector(selectAddressStatus);
  const orderStatus = useSelector(selectOrdersStatus);
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector(getuserInfo);
  const loggedIn = useSelector(isLoggedIn);
  const access = useSelector(getAuthToken)?.access;
  console.log(access);
  useEffect(() => {
    if (loading && !loggedIn) {
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        dispatch(refreshToken());
      }
      if (productStatus === "idle") {
        dispatch(fetchProducts());
      }
      if (brandStatus === "idle") {
        dispatch(fetchBrands());
      }
      setTimeout(() => setLoading(false), 1000);
    }
    if (cartStatus === "idle" && loggedIn) {
      dispatch(fetchCart({ id: userInfo?.user_id, access: access }));
    }
    if (addressStatus === "idle" && loggedIn) {
      dispatch(fetchAddresses({ access, id: userInfo?.user_id }));
    }
    if (orderStatus === "idle" && loggedIn) {
      dispatch(fetchOrders({ access, id: userInfo?.user_id }));
    }
    if (!loggedIn) {
      dispatch(resetCart());
    }
  }, [loading, loggedIn]);

  return (
    <>
      {loading ? (
        <Loading
          loading={loading}
          background="rgb(255,237,213)"
          loaderColor="#3498db"
        />
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
                <Route path="checkout" element={<AddressPage />} />
                <Route path="orderPlaced" element={<OrderPlaced />} />
                <Route path="orders" element={<MyOrders />} />
              </Route>
              {/* In future add 404 Page not found Page. */}
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
