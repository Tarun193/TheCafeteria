// important imports
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="p-4 shadow-xl sticky top-0 left-0">
      <section className="mx-auto flex justify-between items-start sm:items-center flex-wrap flex-col sm:flex-row">
        <div>
          <h1 className="text-3xl">
            The<span className="text-yellow-950">Cafeteria</span> ☕
          </h1>
        </div>
        <SearchBar />
        <nav className="w-full md:w-1/3 md:my-0 mt-4">
          <ul className="text-xl flex w-[80%] mx-auto justify-between md:justify-evenly md:w-full">
            <li>Products</li>
            <li>About Us</li>
            <li>Login</li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
