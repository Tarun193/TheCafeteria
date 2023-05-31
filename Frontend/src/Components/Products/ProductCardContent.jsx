import { AiTwotoneLike } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";

const ProductCardContent = ({ product }) => {
  return (
    <div className="space-y-1 mt-1 font-mono relative text-sm sm:text-lg md:text-xl tracking-tight text-slate-900">
      <p className="text-left">
        {product.title.length <= 24
          ? product.title
          : `${product.title.slice(0, 23)}...`}
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
