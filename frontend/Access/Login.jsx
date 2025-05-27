import { useNavigate } from "react-router-dom";
import axios from "../Helper/axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../ContextApi/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const login = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(
        "/api/login",
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch({ type: "login", payload: res.data.user });
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md px-8 py-10" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <form onSubmit={login} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
