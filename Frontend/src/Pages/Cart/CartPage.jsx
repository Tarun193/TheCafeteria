import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/API/api";
import { useEffect, useState } from "react";
import {
  removeCartItem,
  selectCart,
  selectCartStatus,
  updateCartProductQuantity,
} from "../../Features/cartSlice/cartSlice";
import { getAuthToken, getuserInfo } from "../../Features/auth/authSlice";

const CartPage = () => {
  const cart = useSelector(selectCart);
  const cartStatus = useSelector(selectCartStatus);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const quantityOptions = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();
  const access = useSelector(getAuthToken)?.access;
  const userId = useSelector(getuserInfo)?.user_id;
  useEffect(() => {
    if (cart) {
      calculatePriceNTax();
    }
  }, [cartStatus, cart]);

  const calculatePriceNTax = () => {
    let price = 0;
    cart.forEach(
      (item) => (price += Number(item?.product.price) * Number(item?.quantity))
    );
    setSubTotal(Number(price).toFixed(2));
    setTax(Number(price * 0.13).toFixed(2));
  };

  const handleQuantityUpdate = (quantity, product_id, cartItem_id) => {
    const data = {
      Data: { quantity, cartItem_id: cartItem_id, product_id, userId },
      access,
    };
    dispatch(updateCartProductQuantity(data));
  };

  const handleRemoveCartItem = (cart_id) => {
    try {
      const data = {
        cart_id,
        userId,
        access,
      };
      dispatch(removeCartItem(data)).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  const options = quantityOptions.map((op) => (
    <option key={op} value={op}>
      {op}
    </option>
  ));
  return (
    <>
      {cartStatus === "loading" ? null : (
        <section className="w-full my-10 flex justify-center items-center">
          <section className="w-[90%] md:w-[80%] lg:w-1/2 mx-auto bg-white p-2 py-4 rounded-xl">
            <h2 className="text-2xl font-semibold text-center">My Cart</h2>
            <hr className="my-2 h-1 w-[80%] bg-yellow-950 mx-auto"></hr>
            <div>
              {!cart?.length ? (
                <h1 className="text-center my-8 text-xl font-bold">
                  Nothing in Cart
                </h1>
              ) : (
                cart?.map((cartItem) => (
                  <article
                    key={cartItem?.product?.id}
                    className="w-full m-2 p-2 border-b-black flex esm:flex-row flex-col"
                  >
                    <div className="max-w-[200px] max-h-[200px]">
                      <img
                        src={BASE_URL + cartItem?.product?.images[0]?.image}
                        alt=""
                      />
                    </div>
                    <div className="space-y-4 mx-4">
                      <h3 className="sm:mt-4 mt-0 text-sm sm:text-lg font-bold">
                        {cartItem?.product.title}
                      </h3>
                      <div>
                        <select
                          name="quatity"
                          id="quantiy"
                          value={cartItem?.quantity}
                          onChange={(e) =>
                            handleQuantityUpdate(
                              e.target.value,
                              cartItem?.product?.id,
                              cartItem?.id
                            )
                          }
                          className="space-y-1 border border-black"
                        >
                          {options}
                        </select>
                      </div>
                      <p className="text-lg font-semibold">
                        ${" "}
                        {Number(
                          Number(cartItem?.product.price) *
                            Number(cartItem?.quantity)
                        ).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveCartItem(cartItem?.id)}
                        className="text-md text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
            {!cart?.length ? null : (
              <>
                <hr className="my-2 h-1 w-[80%] bg-yellow-950 mx-auto"></hr>
                <section className="p-4 space-y-2 font-semibold w-full sm:w-1/2">
                  <h3 className="text-xl font-bold">Cart Total</h3>
                  <div className="grid grid-cols-2">
                    <p className="inline-block mr-4">Subtotal:</p>
                    <p className="inline-block">$ {subTotal}</p>

                    <p className="inline-block mr-4">Tax:</p>
                    <p className="inline-block">$ {tax}</p>

                    <p className="inline-block mr-4">Total:</p>
                    <p className="inline-block">
                      $ {(Number(subTotal) + Number(tax)).toFixed(2)}
                    </p>
                  </div>
                </section>
                <button className="m-2 p-2 border border-black rounded-md hover:bg-black hover:text-white">
                  Checkout
                </button>
              </>
            )}
          </section>
        </section>
      )}
    </>
  );
};

export default CartPage;
