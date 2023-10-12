// Important imports
import { useState } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch, setSearch } from "../../Features/search";
const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products/?q=${search}`);
  };
  return (
    <form
      className="w-full mt-3 sm:mt-0 sm:w-[50%] md:w-1/3 relative"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        name="search"
        id="search"
        className="border-black border-2 px-2 py-[0.15rem] w-full rounded-full"
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <button className="absolute top-[0.13rem] right-[0.1rem] bg-white pl-2 pr-3 rounded-full py-1">
        <BsFillSearchHeartFill size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
