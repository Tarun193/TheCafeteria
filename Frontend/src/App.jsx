// Required Imports.
import "./css/styles.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Hero from "./Components/Hero/Hero";
import Brands from "./Components/Brands/Brands";
import TopProducts from "./Components/Products/TopProducts";

function App() {
  return (
    <section className="">
      <Header />
      <Hero />
      <Brands />
      <TopProducts />
      <Footer />
    </section>
  );
}

export default App;
