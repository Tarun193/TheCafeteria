import { useSelector } from "react-redux";
import { selectAllProducts } from "../../Features/Products/ProductSlice";
import { BASE_URL } from "../../utils/API/api";
import { useState } from "react";

const CartPage = () => {
  const products = useSelector(selectAllProducts);
  const [quatity, setQuntity] = useState(1);
  console.log(products);
  return (
    <section className="w-full my-10 flex justify-center items-center">
      <section className="w-[90%] md:w-[80%] lg:w-1/2 mx-auto bg-white p-2 py-4 rounded-xl">
        <h2 className="text-2xl font-semibold text-center">My Cart</h2>
        <hr class="my-2 h-1 w-[80%] bg-yellow-950 mx-auto"></hr>
        <div>
          {products.map((product) => (
            <article
              key={product.id}
              className="w-full m-2 p-2 border-b-black flex esm:flex-row flex-col"
            >
              <div className="max-w-[200px] max-h-[200px]">
                <img src={BASE_URL + product?.images[0]?.image} alt="" />
              </div>
              <div className="space-y-4 mx-4">
                <h3 className="sm:mt-4 mt-0 text-sm sm:text-lg font-bold">
                  {product.title}
                </h3>
                <div>
                  <button
                    onClick={() => {
                      if (quatity > 0) setQuntity(quatity - 1);
                    }}
                    className="w-8 h-8 border"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="text-center w-8 h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border"
                    value={quatity}
                    onChange={(e) => setQuntity(e.target.value)}
                  />
                  <button
                    className="w-8 h-8 border"
                    onClick={() => setQuntity(quatity + 1)}
                  >
                    +
                  </button>
                </div>
                <p className="text-lg font-semibold">
                  $ {Number(product.price * quatity).toFixed(2)}
                </p>
                <button className="text-md text-red-400">Remove</button>
              </div>
            </article>
          ))}
        </div>
        <hr class="my-2 h-1 w-[80%] bg-yellow-950 mx-auto"></hr>
        <section className="p-4 space-y-2 font-semibold w-full sm:w-1/2">
          <h3 className="text-xl font-bold">Cart Total</h3>
          <div className="grid grid-cols-2">
            <p className="inline-block mr-4">Subtotal:</p>
            <p className="inline-block">$ 20.00</p>

            <p className="inline-block mr-4">Tax:</p>
            <p className="inline-block">$ 5.00</p>

            <p className="inline-block mr-4">Total:</p>
            <p className="inline-block">$ 25.00</p>
          </div>
        </section>
        <button className="m-2 p-2 border border-black rounded-md hover:bg-black hover:text-white">
          Checkout
        </button>
      </section>
    </section>
  );
};

export default CartPage;
