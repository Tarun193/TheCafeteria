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

function App() {
  const user = useSelector(getuserInfo);
  // console.log(user);
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
