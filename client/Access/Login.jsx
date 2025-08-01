import { useNavigate } from "react-router-dom";
import axios from "../Helper/axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../ContextApi/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setError((prev) => ({ ...prev, [e.target.id]: null, general: null }));
  };

  const login = async (e) => {
    e.preventDefault();
    setError({});
    try {
      const res = await axios.post(
        "/api/login",
        form,
        { withCredentials: true }
      );
      if (res.status === 200) {
       dispatch({ type: "login", payload: { user: res.data.user, token: res.data.token } });
        navigate("/");
      }
    } catch (err) {
      const response = err.response?.data;
      if (response?.errors) {
        setError(response.errors);
      } else if (response?.error) {
        setError({ general: response.error });
      } else {
        setError({ general: "Login failed. Please try again." });
      }
    }
  };

  return (
    <div className="bg-orange-300">
      <div className="min-h-screen bg-gradient-to-br bg-orange-300 flex items-center justify-center relative overflow-hidden max-w-4xl mx-auto">
        {/* Decorative Bubbles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300/20 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-200/20 rounded-full filter blur-xl animate-spin-slow"></div>
        <div className="absolute top-20 right-1/4 w-24 h-24 bg-white/30 rounded-full filter blur-2xl animate-bounce-slow"></div>

        {/* Glass Card */}
        <div className="w-full mt-10 max-w-lg mx-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl p-8 md:p-10">
          <h2 className="text-3xl font-light text-orange-800 text-center mb-8 drop-shadow-sm">
            Login Here
          </h2>

          {/* General Error Message */}
          {error.general && (
            <p className="text-center text-red-500 mb-4">
              Something went wrong! Type your email or password correctly...
            </p>
          )}

          <form onSubmit={login} className="space-y-6">
            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="email"
                className="text-orange-700 font-light mb-1 mt-3"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email..."
                className={`px-4 py-3 rounded-xl bg-white/40 border backdrop-blur text-orange-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                  error.email
                    ? "border-red-400 placeholder-red-400"
                    : "border-orange-300/40 placeholder-orange-400"
                }`}
              />
              {error.email && (
                <p className="text-red-600 text-sm mt-1">{error.email.msg}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="password"
                className="text-orange-700 font-light mb-1 mt-3"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password..."
                className={`px-4 py-3 rounded-xl bg-white/40 border backdrop-blur text-orange-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                  error.password
                    ? "border-red-400 placeholder-red-400"
                    : "border-orange-300/40 placeholder-orange-400"
                }`}
              />
              {error.password && (
                <p className="text-red-600 text-sm mt-1">
                  {error.password.msg}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full mt-6 bg-orange-200 text-orange-800 font-semibold py-3 px-6 rounded-2xl shadow-lg backdrop-blur-md hover:scale-[1.03] hover:from-orange-400 hover:to-orange-500 transition duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
