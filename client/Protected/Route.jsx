import { createBrowserRouter } from "react-router-dom";
import Layout from "../src/Layout/Layout";
import Home from "../src/Main Components/Home";
import Recipes from "../src/Main Components/Recipes";
import RecipeForm from "../src/Main Components/RecipeForm";
import RecipeCard from "../src/Main Components/RecipeCard";
import Register from "../Access/Register";
import Login from "../Access/Login";
import RecipeDetail from "../src/Components/RecipeDetail";

function route() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Layout/>,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/recipes",
              element: <Recipes />,
            },
            {
              path: "/recipe/create",
              element: <RecipeForm/>,
            },
            {
              path: "/recipe/edit/:id",
              element: <RecipeForm/>
            },
            {
              path: "/recipe_detail/:id",
              element: <RecipeDetail/>
            },
            {
              path: "/recipes",
              element: <RecipeCard />,
            },
            {
              path: "/register",
              element : <Register/>
            },
            {
              path: "/login",
              element : <Login/>
            }
          ],
        },
      ]);

  return router; 
}

export default route;
