// Important imports
import { BsArrowRight } from "react-icons/bs";
import ProductCardImage from "./ProductCardImage";
import ProductCardContent from "./ProductCardContent";

const ProductCard = ({ product }) => {
  return (
    <article className="group relative smdhover:scale-105 min-w-[60%] sm:min-w-[43%] md:min-w-[35%] lg:min-w-[29%] shadow-md hover:shadow-lg hover:shadow-stone-600/70 hover:cursor-pointer flex justify-center py-6 rounded-xl shadow-stone-600/60 mb-2">
      <div className="w-[80%]">
        <ProductCardImage img={product?.images[0]} />
        <ProductCardContent product={product} />
        <button className="border-2 p-2 rounded-[50%] border-black absolute bottom-5 right-16 ease-in opacity-0 duration-300 transition-all md:group-hover:translate-x-8 md:group-hover:opacity-100">
          <BsArrowRight size={13} />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
