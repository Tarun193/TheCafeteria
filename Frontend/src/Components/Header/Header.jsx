// important imports
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
const Header = () => {
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
            <li>Products</li>
            <Link to={"Login/"}>
              <li>Login/SignIn</li>
            </Link>
            <li>Cart 🛒</li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
