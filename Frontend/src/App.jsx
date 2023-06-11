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
import { selectAllProducts } from "./Features/Products/ProductSlice";
import { selectAllBrands } from "./Features/Brand/BrandSlice";
import PrivateRoutes from "./utils/PrivateRoute/PrivateRoute";
import EditProduct from "./Pages/EditProduct/EditProduct";
import { useEffect } from "react";
import Products from "./Pages/Products/Products";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      dispatch(refreshToken());
    }
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="Login" element={<LoginPage />} />
          <Route path="Signup" element={<SignUpPage />} />
          <Route path="admin" element={<PrivateRoutes />}>
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="EditProduct/:id" element={<EditProduct />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
