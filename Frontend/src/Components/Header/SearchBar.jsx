// Important imports
import { BsFillSearchHeartFill } from "react-icons/bs";

const SearchBar = () => {
  return (
    <form className="w-full mt-3 sm:mt-0 sm:w-[50%] md:w-1/3 relative">
      <input
        type="text"
        name="search"
        id="search"
        className="border-black border-2 px-2 py-[0.15rem] w-full rounded-full"
      />
      <button className="absolute top-[0.1rem] right-[0.1rem] bg-white pr-3 rounded-full py-1">
        <BsFillSearchHeartFill size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
