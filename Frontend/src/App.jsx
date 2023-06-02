// Required Imports.
import "./css/styles.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/Products/ProductPage";
import LoginPage from "./Pages/Login/Login";
import Layout from "./Components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product">
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="Login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
