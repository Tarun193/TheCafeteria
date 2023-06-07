import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getuserInfo, logout } from "../../Features/auth/authSlice";
import { Link } from "react-router-dom";

const DropDownMenu = () => {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState(false);
  const user = useSelector(getuserInfo);
  const name = user.name.split(" ")[0];
  const isAdmin = user.admin;
  const dispatch = useDispatch();
  useEffect(() => {
    setMenu(false);
  }, [pathname]);
  return (
    <div className="inline-flex bg-white rounded-md">
      <div className="relative">
        <button
          type="button"
          className="inline-flex items-center justify-center h-full px-2"
          onClick={() => setMenu(!menu)}
        >
          <a href="#" className="text-md mx-1">
            {name}
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
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
          className={`absolute right-0 z-10 w-40 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg ${
            menu ? "block" : "hidden"
          }`}
        >
          <div className="p-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
            >
              Account
            </a>
            {isAdmin ? (
              <>
                <Link
                  to={"/admin/addProduct"}
                  className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 hover:cursor-pointer"
                >
                  Add Product
                </Link>
              </>
            ) : null}
            <button
              onClick={() => dispatch(logout())}
              className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 hover:cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownMenu;
