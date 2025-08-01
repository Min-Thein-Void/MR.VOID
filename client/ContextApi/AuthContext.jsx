import { createContext, useReducer } from "react";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "login":
      // Only store token if needed:
      localStorage.setItem("token", action.payload.token); // or remove this if using cookies only
      return {
        user: action.payload.user,
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

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, { user: null });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
