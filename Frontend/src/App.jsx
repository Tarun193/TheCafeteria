// Required Imports.
import "./css/styles.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./Pages/Products/ProductPage";
function App() {
  return (
    <Router>
      <section className="bg-orange-100 min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Routes>
        <Footer />
      </section>
    </Router>
  );
}

export default App;
