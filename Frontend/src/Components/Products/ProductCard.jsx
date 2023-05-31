// Important imports
import { BsArrowRight } from "react-icons/bs";
import ProductCardImage from "./ProductCardImage";
import ProductCardContent from "./ProductCardContent";


const ProductCard = ({ product }) => {
  const img = product.images[0].image;
  return (
    <article className="group relative md:hover:scale-105 w-[60%] sm:w-[43%] md:w-[35%] lg:w-[29%] shadow-md hover:shadow-lg hover:shadow-stone-600/70 hover:cursor-pointer flex justify-center py-6 rounded-xl shadow-stone-600/60 mb-2  sm:mx-4 lg:mx-6">
      <div className="w-[80%]">
        <ProductCardImage img={`http://127.0.0.1:8000/static${img}`} />
        <ProductCardContent product={product} />
        <button className="border-2 p-2 rounded-[50%] border-black absolute bottom-5 right-16 ease-in opacity-0 duration-300 transition-all md:group-hover:translate-x-8 md:group-hover:opacity-100">
          <BsArrowRight size={13} />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
