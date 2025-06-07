import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Helper/axios";
import { AuthContext } from "../../ContextApi/AuthContext";
import recipe from "../assets/recipe.png";

export default function Navbar() {
  let navigate = useNavigate();

  let [active, setActive] = useState(false);
  let [secActive, setSecActive] = useState(false);

  let activeMenu = () => {
    setSecActive(false);
    setActive(true);
  };

  let secActiveMenu = () => {
    setSecActive(true);
    setActive(false);
  };

  let { user, dispatch } = useContext(AuthContext);

  let logout = async () => {
    try {
      let res = await axios.post("/api/logout");
      if (res.status === 200) {
        dispatch({ type: "logout" });
        navigate("/");
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response.data.error);
      } else {
        console.log("An unexpected error occurred:", e.message);
      }
    }
  };

  useEffect(() => {
    try {
      axios.get("/api/user/me").then((res) => {
        console.log(res.data);
        let user = res.data;
        if (user) {
          dispatch({ type: "login", payload: user });
        } else {
          dispatch({ type: "logout" });
        }
      });
    } catch (e) {
      dispatch({ type: "logout" });
    }
  }, []);

  return (
    <>
    <nav className="bg-orange-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <img
            src={recipe}
            alt="logo"
            className="w-14 h-14 object-contain hover:scale-105"
          />
          <h2 className="text-2xl font-bold text-black font-handwriting">
            Recipe
            <span className="block text-sm text-black font-medium tracking-wide">
              MenuMaker
            </span>
          </h2>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            onClick={secActiveMenu}
            className={`${
              secActive ? "text-black" : "text-yellow-800"
            } font-semibold transition duration-200 text-lg`}
          >
            Home
          </Link>

          <Link
            to="/recipes"
            onClick={activeMenu}
            className={`${
              active ? "text-black" : "text-yellow-800"
            } font-semibold transition duration-200 text-lg`}
          >
            Recipes Menu
          </Link>

          <Link
            to="/recipe/create"
            className="bg-black text-orange-600 border border-orange-700 px-4 py-2 rounded-md font-semibold hover:bg-orange-100 transition duration-300"
          >
            Create
          </Link>

          {!user ? (
            <div className="flex space-x-4">
              <Link
                to="/register"
                className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full font-semibold shadow transition duration-300"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-full font-semibold shadow transition duration-300"
              >
                Login
              </Link>
            </div>
          ) : (
            <>
              <p className="bg-sunset-orange font-medium text-base px-4 py-2 rounded-xl flex items-center space-x-2 shadow-sm">
                <span className="text-black text-[14px] font-bold">Logged in as :</span>
                <span className="text-white font-semibold font-handwriting text-[17px] mb-1">
                  {user.name}
                </span>
              </p>

              <button
                onClick={logout}
                className="bg-red-700 hover:bg-rose-600 text-white px-5 py-2 rounded-md font-semibold transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
    </>
  );
}
