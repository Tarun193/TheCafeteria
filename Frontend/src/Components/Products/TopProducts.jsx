// important imports
import ProductCard from "./ProductCard";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../../Features/Products/ProductSlice";

const TopProducts = () => {
  // To handle the reference of the section which we have to scroll
  const productSection = useRef();

  // Function for handling the scrolling logic
  const handleScroll = (dir) => {
    const section = productSection.current;
    const scrollAmount =
      dir === "left"
        ? section.scrollLeft - (section.clientWidth + 10)
        : section.scrollLeft + (section.clientWidth + 10);

    section.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const products = useSelector(selectAllProducts);
  return (
    <section className="w-full sm:w-[80%] mx-auto font-semibold mt-6 mb-4 px-2 relative">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-center sm:text-left my-2">
        Top Products
      </h2>
      <button
        className="hidden md:block hover:opacity-100 opacity-50 hover:scale-110 absolute top-[50%] z-10 left-[-1rem]"
        onClick={() => handleScroll("left")}
      >
        <BsFillArrowLeftSquareFill size={20} className="" />
      </button>
      <section
        className="flex flex-nowrap gap-4 overflow-y-auto px-1 py-3 no-scrollbar"
        ref={productSection}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      <button
        className="hidden md:block hover:opacity-100 opacity-50 hover:scale-110 absolute top-[50%] right-[-1rem]"
        onClick={() => handleScroll("right")}
      >
        <BsFillArrowRightSquareFill size={20} className="" />
      </button>
    </section>
  );
};

export default TopProducts;
