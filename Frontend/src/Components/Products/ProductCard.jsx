// Important imports
import { BsArrowRight } from "react-icons/bs";
import ProductCardImage from "./ProductCardImage";
import ProductCardContent from "./ProductCardContent";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const img = product.images.length ? product.images[0].image : null;
  return (
    <article
      onClick={() => navigate(`product/${product?.id}`)}
      className="group relative md:hover:scale-105 sm:max-w-[43%] md:max-w-[35%] lg:max-w-[29%] max-w-[70%] min-w-[70%]  sm:min-w-[43%] md:min-w-[35%] lg:min-w-[29%] shadow-md hover:shadow-lg hover:shadow-stone-600/70 hover:cursor-pointer flex justify-center py-6 rounded-xl shadow-stone-600/60 mb-2 mx-4 bg-white"
    >
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
