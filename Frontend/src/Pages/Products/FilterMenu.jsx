import { useEffect, useState } from "react";

const FilterMenu = ({ BrandFilter, priceFilterElement, className }) => {
  const [menu, setMenu] = useState(false);

  return (
    <div className={`inline-flex bg-white rounded-md ${className}`}>
      <div className="relative">
        <button
          type="button"
          className="inline-flex items-center text-lg justify-center px-2"
          onClick={() => setMenu(!menu)}
        >
          Filter
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mx-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          className={` absolute right-[-0.5rem] z-10 w-40 p-3 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg ${
            menu ? "block" : "hidden"
          }`}
        >
          <fieldset className="mt-2">
            <legend className="my-1 font-semibold text-lg">Brands</legend>
            <div className="ml-4 space-y-2 text-md">{BrandFilter}</div>
          </fieldset>
          <fieldset className="mt-2">
            <legend className="my-1 font-semibold text-lg">Price</legend>
            <div className="ml-4 space-y-2 text-md">{priceFilterElement}</div>
          </fieldset>
          <button
            className="mt-2 border border-black px-2 py-1 bg-black text-white"
            onClick={() => setMenu(!menu)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
