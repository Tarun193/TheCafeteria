import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../../Features/addressSlice/addressSlice";
const AddressPageForm = ({
  user_id,
  access,
  className,
  address,
  setAllowAdd,
}) => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postal, setPostal] = useState("");
  const [province, setProvince] = useState("");

  const dispatch = useDispatch();

  const handleAddAddress = () => {
    const data = {
      email,
      mobile,
      first_name: firstName,
      last_name: lastName,
      Street: street,
      city,
      country,
      postal,
      province,
      user_id,
      selected: address?.length ? false : true,
    };
    try {
      const Data = { access, data };
      dispatch(addAddress(Data)).unwrap();
      setAllowAdd(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form autoComplete="off" className={className}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="+155555555555"
            pattern="^\+[1-9]{1}[0-9]{3,14}$"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            value={street}
            onChange={(e) => setStreet(e.target.value)}
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
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
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
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
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
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </p>
      </div>
      <button
        type="button"
        className="my-2 p-2 border border-black rounded-md hover:bg-black hover:text-white text-lg"
        onClick={handleAddAddress}
      >
        Add Address
      </button>
      {address?.length ? (
        <button
          className="m-2 p-2 border border-black rounded-md hover:bg-black hover:text-white text-lg"
          type="button"
          onClick={() => setAllowAdd(false)}
        >
          Cancel
        </button>
      ) : null}
    </form>
  );
};

export default AddressPageForm;
