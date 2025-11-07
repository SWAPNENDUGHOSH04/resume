import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import api from "../configs/api"; // your axios instance
import { login } from "../app/features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlstate = query.get("state");

  const [state, setState] = React.useState(urlstate || "login");
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submit (works for both login/register)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = state === "login" ? "/api/users/login" : "/api/users/register";

      const res = await api.post(endpoint, data);

      dispatch(login(res.data));
      localStorage.setItem("token", res.data.token);

      toast.success(res.data.message || `${state === "login" ? "Logged in" : "Registered"} successfully!`);
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {state === "login" ? "Login to your account" : "Create a new account"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {state === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={data.name}
              onChange={onChangeHandler}
              className="border border-gray-300 rounded-lg p-2 outline-none"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded-lg p-2 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded-lg p-2 outline-none"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
          >
            {state === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          {state === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setState("register")}
                className="text-blue-600 font-medium hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setState("login")}
                className="text-blue-600 font-medium hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
