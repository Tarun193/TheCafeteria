// Required Imports.
import "./css/styles.css";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/ProductPage/ProductPage";
import LoginPage from "./Pages/Login/Login";
import Layout from "./Components/Layout";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import { getuserInfo, refreshToken } from "./Features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./Pages/AddProduct/AddProduct";
import {
  selectProductsStatus,
  fetchProducts,
} from "./Features/Products/ProductSlice";
import { selectBrandStatus, fetchBrands } from "./Features/Brand/BrandSlice";
import PrivateRoutes from "./utils/PrivateRoute/PrivateRoute";
import EditProduct from "./Pages/EditProduct/EditProduct";
import { useEffect, useState } from "react";
import Products from "./Pages/Products/Products";
import CartPage from "./Pages/Cart/CartPage";

function App() {
  const dispatch = useDispatch();
  const productStatus = useSelector(selectProductsStatus);
  const brandStatus = useSelector(selectBrandStatus);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    if (loading) {
      if (refresh) {
        dispatch(refreshToken());
      }
      if (productStatus === "idle") {
        dispatch(fetchProducts());
      }
      if (brandStatus === "idle") {
        dispatch(fetchBrands());
      }
      setLoading(false);
    } else {
      // load cartitems if user is logged in.
    }
  }, [loading]);
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
              <Route path="cart" element={<CartPage />} />
              <Route path="products">
                <Route index element={<Products />} />
                <Route path=":id" element={<ProductPage />} />
              </Route>
              <Route path="admin" element={<PrivateRoutes />}>
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="EditProduct/:id" element={<EditProduct />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
