import { useNavigate } from "react-router-dom";
import axios from "../Helper/axios";
import { useState, useContext } from "react";
import { AuthContext } from "../ContextApi/AuthContext";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setError((prev) => ({ ...prev, [e.target.id]: null, general: null }));
  };

  const register = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const res = await axios.post("/api/register", form, { withCredentials: true });
      if (res.status === 201) {
        dispatch({ type: "login", payload: res.data.user });
        setSuccess(true);
        setForm({ name: "", email: "", password: "" });
        navigate("/");
      }
    } catch (e) {
      setError(
        e.response?.data?.error
          ? { general: { msg: e.response.data.error } }
          : e.response?.data?.errors || { general: { msg: "Registration failed" } }
      );
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
            Register Here
          </h2>

          {/* Success Message */}
          {success && (
            <p className="text-green-600 text-center mb-4">
              Registration successful!
            </p>
          )}
          {error?.general && (
            <p className="text-red-600 text-center mb-4">
              {error.general.msg}
            </p>
          )}

          <form onSubmit={register} className="space-y-6">
            {/* Name */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-orange-700 font-light">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name..."
                className={`px-4 py-3 rounded-xl bg-white/40 border backdrop-blur text-orange-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${
                  error?.name
                    ? "border-red-400 placeholder-red-400"
                    : "border-orange-300/40 placeholder-orange-400"
                }`}
              />
              {error?.name && (
                <p className="text-red-600 text-sm mt-1">{error.name.msg}</p>
              )}
            </div>

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
                  error?.email
                    ? "border-red-400 placeholder-red-400"
                    : "border-orange-300/40 placeholder-orange-400"
                }`}
              />
              {error?.email && (
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
                  error?.password
                    ? "border-red-400 placeholder-red-400"
                    : "border-orange-300/40 placeholder-orange-400"
                }`}
              />
              {error?.password && (
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
