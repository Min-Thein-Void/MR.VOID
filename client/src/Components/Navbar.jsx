import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Helper/axios";
import { AuthContext } from "../../ContextApi/AuthContext";
import recipe from "../assets/recipe.png";

export default function Navbar() {
  let navigate = useNavigate();

  let [active, setActive] = useState(false);
  let [secActive, setSecActive] = useState(false);
  let [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let activeMenu = () => {
    setSecActive(false);
    setActive(true);
    setMobileMenuOpen(false);
  };

  let secActiveMenu = () => {
    setSecActive(true);
    setActive(false);
    setMobileMenuOpen(false);
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
    <div className="fixed w-full top-0 left-0 z-50">
      <nav
        className="sticky top-4 z-50 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] transition-all duration-500"
        style={{
          borderRadius: "2rem",
          margin: "0.8rem",
          padding: "0.6rem 0",
          fontFamily: "'Poppins', 'Inter', sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <img
              src={recipe}
              alt="logo"
              className="w-16 h-16 object-contain hover:scale-105 transition"
              style={{
                filter: "drop-shadow(0 4px 16px rgba(255,255,255,0.2))",
                borderRadius: "1rem",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255, 255, 255, 0.3)",
                padding: "0.3rem",
              }}
            />
            <div className="text-pretty">
              <h2
                className="text-3xl font-extrabold"
                style={{
                  fontFamily: "'Pacifico', cursive",
                  color: "orange",
                  textShadow: "0 2px 12px rgba(255,255,255,0.15)",
                }}
              >
                Recipe
                <span
                  className="block text-base font-medium tracking-wide"
                  style={{
                    fontFamily: "'Pacifico', cursive",
                    color: "orange",
                    letterSpacing: "2px",
                    marginTop: "0.3em",
                    textShadow: "0 1px 4px rgba(255,255,255,0.1)",
                  }}
                >
                  MenuMaker
                </span>
              </h2>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              onClick={secActiveMenu}
              className={`${
                secActive ? "text-white/95" : "text-white/70"
              } font-semibold text-lg px-4 py-1.5 rounded-xl backdrop-blur bg-white/10 border border-white/20 hover:bg-white/20 hover:text-orange-200 transition duration-300`}
            >
              Home
            </Link>

            <Link
              to="/recipes"
              onClick={activeMenu}
              className={`${
                active ? "text-white/95" : "text-white/70"
              } font-semibold text-lg px-4 py-1.5 rounded-xl backdrop-blur bg-white/10 border border-white/20 hover:bg-white/20 hover:text-orange-200 transition duration-300`}
            >
              Recipes Menu
            </Link>

            <Link
              to="/recipe/create"
              className="bg-gradient-to-br from-white/10 to-white/20 border border-white/30 text-white/90 px-5 py-2 rounded-2xl font-semibold shadow-[0_4px_24px_rgba(255,255,255,0.1)] backdrop-blur-md hover:scale-[1.03] transition duration-300"
            >
              Create
            </Link>

            {!user ? (
              <div className="flex space-x-4">
                <Link
                  to="/register"
                  className="bg-white/10 border border-white/20 text-white/80 px-4 py-1.5 rounded-xl font-semibold shadow-md hover:bg-white/20 hover:text-orange-100 transition duration-200 backdrop-blur-md text-sm"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-white/10 border border-white/20 text-white/80 px-4 py-1.5 rounded-xl font-semibold shadow-md hover:bg-white/20 hover:text-orange-100 transition duration-200 backdrop-blur-md text-sm"
                >
                  Login
                </Link>
              </div>
            ) : (
              <>
                <p
                  className="bg-white/10 border border-white/20 font-medium text-base px-5 py-2 rounded-full flex items-center space-x-2 shadow-sm backdrop-blur"
                  style={{ color: "#fff" }}
                >
                  <span
                    className="capitalize font-thin"
                    style={{
                      fontSize: "1.1rem",
                    }}
                  >
                    {user.name}
                  </span>
                </p>

                <button
                  onClick={logout}
                  className="bg-gradient-to-r from-white/10 to-white/20 border border-white/30 text-white/90 px-6 py-2 rounded-2xl font-semibold shadow-lg backdrop-blur hover:from-orange-200/20 hover:to-orange-300/20 hover:text-orange-100 hover:scale-[1.04] transition duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {user ? (
              <button className="bg-white/10 p-3 rounded-full text-white/70 capitalize shadow-sm backdrop-blur">
                {user.name}
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/register"
                  className="bg-white/10 border border-white/20 text-white/80 px-4 py-1.5 rounded-xl font-semibold shadow-md hover:bg-white/20 hover:text-orange-100 transition duration-200 backdrop-blur-md text-sm"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-white/10 border border-white/20 text-white/80 px-4 py-1.5 rounded-xl font-semibold shadow-md hover:bg-white/20 hover:text-orange-100 transition duration-200 backdrop-blur-md text-sm"
                >
                  Login
                </Link>
              </div>
            )}
            <button
              className="bg-white/10 text-white/80 p-2 rounded-full shadow-lg backdrop-blur-md hover:bg-white/20 transition"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Open menu"
            >
              {mobileMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 top-[5.5rem] mt-12 z-40 transition-transform duration-500 ease-in-out ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4 px-8 py-6 mx-4 mt-2 border border-white/20 bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl">
          <Link
            to="/"
            onClick={secActiveMenu}
            className={`${
              secActive ? "text-white/95" : "text-white/70"
            } bg-white/10 backdrop-blur-md border border-white/20 text-center px-5 py-2 rounded-xl font-semibold text-lg shadow-[0_4px_12px_rgba(255,255,255,0.1)] hover:bg-white/20 hover:text-orange-200 hover:scale-[1.04] transition duration-300`}
          >
            Home
          </Link>

          <Link
            to="/recipes"
            onClick={activeMenu}
            className={`${
              active ? "text-white/95" : "text-white/70"
            } bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-xl font-semibold text-lg text-center shadow-[0_4px_12px_rgba(255,255,255,0.1)] hover:bg-white/20 hover:text-orange-200 hover:scale-[1.04] transition duration-300`}
          >
            Recipes Menu
          </Link>

          <Link
            to="/recipe/create"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-gradient-to-br from-white/10 to-white/20 border border-white/30 text-white/90 text-center font-bold px-5 py-2 rounded-2xl shadow-lg hover:scale-[1.03] transition duration-300 backdrop-blur"
          >
            Create
          </Link>

          {user && (
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="bg-gradient-to-r from-white/10 to-white/20 border border-white/30 text-white/90 px-6 py-2 rounded-2xl font-semibold shadow-lg backdrop-blur hover:from-orange-200/20 hover:to-orange-300/20 hover:text-orange-100 hover:scale-[1.03] transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
