import { useEffect, useState, useContext } from "react";
import axios from "../../Helper/axios";
import { AuthContext } from "../../ContextApi/AuthContext";

function useRecipe() {
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const recipesPerPage = 6;

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/recipes", {
        params: {
          search: searchTerm.trim(),
        },
      });
      if (res && res.data) {
        setRecipe(res.data);
        setCurrentPage(1);
        setError(null);
      } else {
        setError("No data returned from the server.");
      }
    } catch (e) {
      setError("Please login to view recipes...<3");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchRecipes();
    }
  }, [user]);

  return {
    recipe,
    setRecipe,
    loading,
    error,
    currentPage,
    setCurrentPage,
    recipesPerPage,
    searchTerm,
    setSearchTerm,
    fetchRecipes,
  };
}

export default useRecipe;
