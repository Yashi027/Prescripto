import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">

      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-[120px]"></div>

      <div className="absolute top-1/2 -right-32 w-[420px] h-[420px] bg-cyan-300 rounded-full opacity-20 blur-[140px]"></div>

      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-sky-200 rounded-full opacity-20 blur-[100px]"></div>

      <form className="relative z-10 w-full max-w-md px-5">
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8">

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">
            {state} Login
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Welcome back! Please login to continue.
          </p>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-300 outline-none"
              required
            />
          </div>

          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-300 outline-none"
              required
            />
          </div>

          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition duration-300">
            Login
          </button>

          <p className="text-center text-sm text-gray-600 mt-5">
            {state === "Admin" ? "Doctor Login?" : "Admin Login?"}{" "}
            <span
              onClick={() =>
                setState(state === "Admin" ? "Doctor" : "Admin")
              }
              className="text-primary font-semibold cursor-pointer hover:underline"
            >
              Click Here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;