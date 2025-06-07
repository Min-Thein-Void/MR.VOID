import axios from "../Helper/axios";
import React, { useState  } from "react";

function Register() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(null);

  let register = async (e) => {
    try {
      e.preventDefault();
      setError(null)
      let formData = {
        name,
        email,
        password,
      };

      let res = await axios.post("/api/register", formData, {
        withCredentials : true
      });
      console.log(res);
    } catch (e) {
     console.log(e.response.data.errors)
     setError(e.response.data.errors)
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Register Form
      </h2>

      <form onSubmit={register}>
        {/* Recipe Title */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
            placeholder="Enter your name..."
          />
          { error && error.name && <p className="text-red-500 mt-2">{error.name.msg}</p>}
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold" htmlFor="email">
            Email
          </label>

          <div className="flex items-center space-x-4 mt-2">
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
            />
              { error && error.email && <p className="text-red-500 mt-2">{error.email.msg}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold"
            htmlFor="password"
          >
            Password
          </label>

          <div className="flex items-center space-x-4 mt-2">
            <input
              type="text"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
            />
              { error && error.password && <p className="text-red-500 mt-2">{error.password.msg}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            onClick={register}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
