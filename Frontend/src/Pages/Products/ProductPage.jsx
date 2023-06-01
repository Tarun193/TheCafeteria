import { useParams } from "react-router-dom";
import { selectAllProducts } from "../../Features/Products/ProductSlice";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/API/api";
import { useState } from "react";
import { AiTwotoneLike } from "react-icons/ai";
const ProductPage = () => {
  const { id } = useParams();
  const products = useSelector(selectAllProducts);
  const product = products.find((item) => item.id == id);
  const [quatity, setQuntity] = useState(1);
  console.log(product);
  return (
    <section className="w-full my-10 flex justify-center items-center">
      <section className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto bg-white p-2 rounded-xl flex flex-col items-start md:flex-row py-4">
        <div className="flex justify-center w-full md:w-1/2">
          <img
            src={`${BASE_URL}${product?.images[0]?.image}`}
            className="w-[250px] sm:w-[350px] md:w-[450px]"
          />
        </div>
        <div className="flex-1 space-y-3 md:mt-6 text-md md:text-2xl mx-4">
          <h2 className="text-lg md:text-3xl font-bold">{product?.title}</h2>
          <h2 className="text-md font-semibold">{product?.subTitle}</h2>
          <p className="font-bold">Price: ${product?.price}</p>
          <div className="text-2xl">
            <AiTwotoneLike
              size={27}
              className="hover:cursor-pointer hover:text-blue-500 hover:bg-yellow-300 rounded-full inline relative top-[-0.2rem]"
            />{" "}
            <p className="inline">{product?.likes}</p>
          </div>
          <div>
            <button
              onClick={() => {
                if (quatity > 0) setQuntity(quatity - 1);
              }}
              className="w-10 h-10 border"
            >
              -
            </button>
            <input
              type="number"
              className="text-center w-10 h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border"
              value={quatity}
              onChange={(e) => setQuntity(e.target.value)}
            />
            <button
              className="w-10 h-10 border"
              onClick={() => setQuntity(quatity + 1)}
            >
              +
            </button>
          </div>
          <div>
            <button className="text-md mt-2 bg-black text-white rounded-lg px-3 sm:text-lg py-2">
              Buy Now
            </button>
            <button className="text-md  bg-black text-white rounded-lg px-3 sm:text-lg py-2 mx-1 mt-2">
              Add To Cart
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProductPage;
