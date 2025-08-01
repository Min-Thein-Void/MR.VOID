import { createContext, useReducer } from "react";
import axios from "../Helper/axios";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("token", JSON.stringify(action.payload));
      return {
        user: action.payload,
      };
    case "logout":
      localStorage.removeItem("token");
      return {
        user: null,
      };
    default:
      return state;
  }
};

const loadUser = async (dispatch) => {
  try {
    const res = await axios.get("/api/me");
    if (res.status === 200) {
      dispatch({ type: "login", payload: res.data });
    } else {
      dispatch({ type: "logout" });
    }
  } catch {
    dispatch({ type: "logout" });
  }
};

const AuthContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(AuthReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider, loadUser };
