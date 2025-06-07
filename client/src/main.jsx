
import { createRoot } from "react-dom/client";
import "./index.css";
import route from "../Protected/Route"
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "../ContextApi/AuthContext";


createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
     <RouterProvider router={route()} />
  </AuthContextProvider>
);
