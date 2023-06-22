import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../Features/cartSlice/cartSlice";
import { useEffect, useState } from "react";
import { getAuthToken, getuserInfo } from "../../Features/auth/authSlice";
import {
  addAddress,
  selectAddress,
  updateSelectedAddress,
} from "../../Features/addressSlice/addressSlice";
import API from "../../utils/API/api";
import AddressPageForm from "./AddressPageForm";

const AddressPage = () => {
  const addresses = useSelector(selectAddress);
  const user_id = useSelector(getuserInfo)?.user_id;
  const access = useSelector(getAuthToken)?.access;
  const dispatch = useDispatch();
  const [allowAdd, setAllowAdd] = useState("");

  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const cart = useSelector(selectCart);

  const changeSelectedaAddress = (address_id) => {
    try {
      const data = {
        id: address_id,
        user_id,
      };
      dispatch(updateSelectedAddress({ access, data })).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  const handlePayNow = async () => {
    const response = await API.post(
      "create-checkout-session/",
      { user_id },
      {
        headers: {
          Authorization: "Bearer " + access,
        },
      }
    );
    if (response.data.message === "Success") {
      window.location = response.data.url;
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (addresses?.length) {
      setAllowAdd(false);
    } else {
      setAllowAdd(true);
    }
    if (cart) {
      calculatePriceNTax();
    }
  }, [cart]);
  console.log(addresses);
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
      <section
        className={`w-5/6 md:w-2/3 bg-white mx-auto my-4 ${
          addresses?.length ? "Block" : "hidden"
        }`}
      >
        <section className="px-8 py-4 bg-white mx-auto my-4">
          <h3 className=" text-center font-bold text-xl sm:text-2xl my-4">
            My Address
          </h3>
          <div className="my-2 space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                onClick={() => changeSelectedaAddress(address.id)}
                className={`font-semibold p-2  border-2 hover:cursor-pointer ${
                  address.selected
                    ? "opacity-100  border-blue-300"
                    : "opacity-60"
                } shadow-lg space-y-2`}
              >
                <p>{address.first_name + " " + address.last_name}</p>
                <p className="break-words text-xs">
                  {address.email + ", " + address.mobile}
                </p>
                <p>{`${address.Street}, ${address.city}, ${address.postal}, ${address.province}, ${address.country}`}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setAllowAdd(true)}
            className="p-2 border border-black"
          >
            Add New Address
          </button>
        </section>
      </section>
      <section
        className={`w-5/6 md:w-2/3 bg-white mx-auto my-4 ${
          allowAdd ? "block" : "hidden"
        }`}
      >
        <section className="py-4 bg-white mx-auto my-4">
          <AddressPageForm
            user_id={user_id}
            access={access}
            address={addresses}
            className={"w-5/6 mx-auto py-8 text-xl"}
            setAllowAdd={setAllowAdd}
          />
        </section>
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
          <button
            onClick={() => handlePayNow()}
            className={`mt-4 mb-2 p-2 border border-black rounded-md hover:bg-black hover:text-white hover: ${
              !addresses?.length ? "opacity-50 hover:cursor-not-allowed" : null
            }`}
            disabled={!addresses?.length}
          >
            Pay Now
          </button>
        </section>
      )}
    </section>
  );
};

export default AddressPage;
