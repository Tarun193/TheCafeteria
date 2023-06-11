import { AiTwotoneLike } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";

const ProductCardContent = ({ product }) => {
  return (
    <div className="space-y-2 mt-1 font-roboto relative text-sm sm:text-md md:text-lg tracking-tight text-slate-900 font-bold">
      <p className="text-left">
        {product.title.length <= 18
          ? product.title
          : `${product.title.slice(0, 18)}...`}
      </p>
      <div>
        <BsCurrencyDollar size={20} className="inline relative top-[-0.1rem]" />
        <p className="inline">{product.price}</p>
      </div>
      <div>
        <AiTwotoneLike
          size={25}
          className="inline text-yellow-600 relative top-[-0.2rem]"
        />{" "}
        <p className="inline">{product.likes}</p>
      </div>
    </div>
  );
};

export default ProductCardContent;
