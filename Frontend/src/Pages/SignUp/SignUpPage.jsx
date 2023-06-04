import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, userSignUp } from "../../Features/auth/authSlice";
import API from "../../utils/API/api";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const LoggedIn = useSelector(isLoggedIn);
  const navigate = useNavigate();

  const canSubmit =
    [firstName, lastName, email, password1, password2].every(Boolean) &&
    requestStatus === "idle" &&
    password1 === password2;
  useEffect(() => {
    if (LoggedIn) {
      navigate("/");
    }
  }, [LoggedIn]);

  const handleLoginSubmition = async (e) => {
    setRequestStatus("pending");
    e.preventDefault();
    try {
      const data = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        password: password1,
        email: email,
        username: firstName + lastName,
      });
      await dispatch(userSignUp(data)).unwrap();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword1("");
      setPassword2("");
      setError(null);
      navigate("Login/");
    } catch (e) {
      setError(e.message);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section>
      <section className="min-h-[80vh] flex justify-center items-center">
        <form
          onSubmit={(e) => handleLoginSubmition(e)}
          className="p-6 sm:p-12 text-lg sm:text-2xl bg-white rounded-md space-y-4 shadow-lg max-h-[450px] overflow-scroll no-scrollbar"
        >
          <legend className="text-center font-bold">Sign Up</legend>
          <p className="space-y-2">
            <label htmlFor="first_name" className="block">
              First Name:
            </label>
            <input
              type="text"
              id="first_name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="border border-black block p-1"
            />
          </p>
          <p className="space-y-2">
            <label htmlFor="last_name" className="block">
              Last Name:
            </label>
            <input
              type="text"
              id="last_name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="border border-black block p-1"
            />
          </p>
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
            <label htmlFor="password1" className="block p-1">
              Password:
            </label>
            <input
              type="password"
              id="password1"
              onChange={(e) => setPassword1(e.target.value)}
              value={password1}
              className="border border-black block p-1"
            />
          </p>
          <p className="space-y-2">
            <label htmlFor="password2" className="block p-1">
              Confirm Password:
            </label>
            <input
              type="password"
              id="password2"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              className="border border-black block p-1"
            />
          </p>
          <p className="text-sm">
            {password2 ? (
              password1 === password2 ? (
                <span className="text-green-500">Password Matched</span>
              ) : (
                <span className="text-red-400">Password Not Matching</span>
              )
            ) : null}
          </p>
          <p className="text-red-400 text-md">{error}</p>
          <p className="text-sm">
            Already Have an account?{" "}
            <Link to={"/Login/"} className="underline">
              login
            </Link>{" "}
          </p>
          <button
            type="submit"
            className={
              `text-md  bg-black text-white rounded-md px-3 sm:text-lg py-2 mt-2 ` +
              (!canSubmit
                ? "opacity-50 hover:cursor-not-allowed"
                : "hover:cursor-pointer")
            }
            disabled={!canSubmit}
          >
            Sign Up
          </button>
        </form>
      </section>
    </section>
  );
};

export default SignUpPage;
