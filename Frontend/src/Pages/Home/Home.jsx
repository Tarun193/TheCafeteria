// Importing components of home page.
import Hero from "../../Components/Hero/Hero";
import Brands from "../../Components/Brands/Brands";
import TopProducts from "../../Components/TopProducts/TopProducts";
import Mission from "../../Components/Mission/Mission";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Hero />
      <Brands />
      <Mission />
      <TopProducts />
    </>
  );
};

export default Home;
