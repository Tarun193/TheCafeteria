import { useEffect, useState } from "react";
import { userLogin, isLoggedIn } from "../../Features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const LoggedIn = useSelector(isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (LoggedIn) {
      navigate("/");
    }
  }, []);

  const handleLoginSubmition = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email: email, password: password }));
  };

  return (
    <section className="min-h-[80vh] flex justify-center items-center">
      <form
        onSubmit={(e) => handleLoginSubmition(e)}
        className="p-6 sm:p-12 text-lg sm:text-2xl bg-white rounded-md space-y-4 shadow-lg"
      >
        <p className="space-y-2">
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-black block p-1"
          />
        </p>
        <p className="space-y-2">
          <label htmlFor="password" className="block p-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-black block"
          />
        </p>
        <p className="text-sm">
          Don't Have an account? <Link className="underline">SignUp</Link>{" "}
        </p>
        <button
          type="submit"
          className="text-md  bg-black text-white rounded-md px-3 sm:text-lg py-2 mt-2"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
