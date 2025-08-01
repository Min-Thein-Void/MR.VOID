
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "../ContextApi/AuthContext";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
