// Required Imports.
import "./css/styles.css";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/Products/ProductPage";
import LoginPage from "./Pages/Login/Login";
import Layout from "./Components/Layout";
import SignUpPage from "./Pages/SignUp/SignUpPage";
import { getuserInfo } from "./Features/auth/authSlice";
import { useSelector } from "react-redux";
import AddProduct from "./Pages/AddProduct/AddProduct";
import { selectAllProducts } from "./Features/Products/ProductSlice";
import PrivateRoutes from "./utils/PrivateRoute/PrivateRoute";

function App() {
  const user = useSelector(getuserInfo);
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product">
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="Login" element={<LoginPage />} />
          <Route path="Signup" element={<SignUpPage />} />
          <Route path="admin" element={<PrivateRoutes />}>
            <Route path="addProduct" element={<AddProduct />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
