import { createContext, useReducer } from "react";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem('token',JSON.stringify(action.payload))
      return {
        user: action.payload,
      };
    case "logout":
      localStorage.removeItem('token')
      return {
        user: null,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(AuthReducer, {
    user: null,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
