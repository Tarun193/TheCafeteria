// important imports
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { isLoggedIn, logout } from "../../Features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import DropDownMenu from "./DropDownMenu";

const Header = () => {
  const loggedIN = useSelector(isLoggedIn);
  const dispatch = useDispatch();
  return (
    <header className="p-4 shadow-xl sticky top-0 left-0 bg-white z-20">
      <section className="mx-auto flex justify-between items-start sm:items-center flex-wrap flex-col sm:flex-row">
        <div>
          <Link to={"/"}>
            <h1 className="text-3xl font-bold ml-2">
              The<span className="text-yellow-950">Cafeteria</span> ☕
            </h1>
          </Link>
        </div>
        <SearchBar />
        <nav className="w-full md:w-1/3 md:my-0 mt-4">
          <ul className="text-[0.9rem] md:text-[1rem] lg:text-xl font-semibold flex w-full sm:w-[80%] mx-auto justify-between md:justify-evenly md:w-full">
            <Link to={"/products/"}>Products</Link>
            <Link to={"/cart/"}>Cart 🛒</Link>
            <li>
              {loggedIN ? (
                <DropDownMenu />
              ) : (
                <Link to={"Login/"}>Login/SignIn</Link>
              )}
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
