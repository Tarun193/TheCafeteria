import { useSelector } from "react-redux";
import { selectCart } from "../../Features/cartSlice/cartSlice";
import { useEffect, useState } from "react";
const AddressPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const cart = useSelector(selectCart);
  useEffect(() => {
    if (cart) {
      calculatePriceNTax();
    }
  }, [cart]);

  const calculatePriceNTax = () => {
    let price = 0;
    cart.forEach(
      (item) => (price += Number(item?.product.price) * Number(item?.quantity))
    );
    setSubTotal(Number(price).toFixed(2));
    setTax(Number(price * 0.13).toFixed(2));
  };
  return (
    <section>
      <section className="w-5/6 md:w-2/3 bg-white mx-auto my-4">
        <form
          autoComplete="off"
          className="w-5/6 mx-auto py-8 text-xl space-y-4"
        >
          <legend className="text-center font-bold">Billing Address</legend>
          <div className="flex flex-wrap justify-between gap-4">
            <p className="space-y-2 flex-1 min-w-[70%] sm:min-w-[45%]">
              <label htmlFor="email" className="block">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="border border-black block p-1 w-full"
                autoComplete="off"
              />
            </p>
            <p className="space-y-2 flex-1 min-w-[70%] sm:min-w-[45%]">
              <label htmlFor="Mobile" className="block">
                Mobile: <span className="text-md text-red-400">*</span>
              </label>
              <input
                type="tel"
                id="Mobile"
                className="border border-black block p-1 w-full"
              />
            </p>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <p className="space-y-2 flex-1 min-w-[70%] sm:min-w-[45%]">
              <label htmlFor="firstName" className="block">
                First Name: <span className="text-md text-red-400">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className="border border-black block p-1 w-full"
              />
            </p>
            <p className="space-y-2 flex-1 min-w-[70%] sm:min-w-[45%]">
              <label htmlFor="lastName" className="block">
                Last Name: <span className="text-md text-red-400">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                className="border border-black block p-1 w-full"
              />
            </p>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <p className="space-y-2 flex-1 min-w-[70%] sm:min-w-[45%]">
              <label htmlFor="stzeetAddress" className="block">
                Street Address: <span className="text-md text-red-400">*</span>
              </label>
              <input
                type="text"
                id="streetAddress"
                className="border border-black block p-1 w-full"
              />
            </p>

            <p className="space-y-2 flex-1 min-w-[70%] sm:min-w-[45%]">
              <label htmlFor="city" className="block">
                city: <span className="text-md text-red-400">*</span>
              </label>
              <input
                type="text"
                id="city"
                className="border border-black block p-1 w-full"
              />
            </p>
          </div>
          <div className="flex justify-between gap-4 flex-wrap">
            <p className="space-y-2 flex-1 min-w-[70%] sm:min-w-[30%]">
              <label htmlFor="Country" className="block">
                Country: <span className="text-md text-red-400">*</span>
              </label>
              <input
                type="text"
                id="Country"
                className="border border-black block p-1 w-full"
              />
            </p>

            <p className="space-y-2 flex-1 min-w-[70%] sm:min-w-[30%]">
              <label htmlFor="Postal" className="block">
                Postal: <span className="text-md text-red-400">*</span>
              </label>
              <input
                type="text"
                id="Postal"
                className="border border-black block p-1 w-full"
              />
            </p>
            <p className="space-y-2 flex-1 min-w-[70%] sm:min-w-[30%]">
              <label htmlFor="Province" className="block">
                Province: <span className="text-md text-red-400">*</span>
              </label>
              <input
                type="text"
                id="Province"
                className="border border-black block p-1 w-full"
              />
            </p>
          </div>
          <button
            type="button"
            className="my-2 p-2 border border-black rounded-md hover:bg-black hover:text-white text-lg"
          >
            Add Address
          </button>
        </form>
      </section>

      {!cart?.length ? null : (
        <section className="w-5/6 md:w-2/3 bg-white mx-auto my-4 p-8">
          <section className="space-y-2 font-semibold w-5/6">
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
          <button className="mt-4 mb-2 p-2 border border-black rounded-md hover:bg-black hover:text-white">
            Pay Now
          </button>
        </section>
      )}
    </section>
  );
};

export default AddressPage;
