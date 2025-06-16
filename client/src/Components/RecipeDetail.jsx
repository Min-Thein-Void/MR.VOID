import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../Helper/axios";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // 🟠 Post a new comment
  const postComment = async (e) => {
    e.preventDefault();
    try {
      const data = {
        text,
        recipe: id,
      };
      const res = await axios.post("/api/text/comments", data);
      setComments(res.data);
      setText("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  // 🟠 Fetch recipe and comments
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get("/api/recipes/" + id);
        if (res.status === 200) {
          setRecipe(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/text/comments/recipe/${id}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    fetchRecipe();
    fetchComments();
  }, [id]);

  if (!recipe) {
    return (
      <div className="text-center text-orange-500 font-bold text-2xl py-10 tracking-wide">
        Loading recipe...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-900 to-orange-900 px-2 py-8">
      {/* Recipe Section */}
      <div className="max-w-5xl mx-auto p-4 sm:p-8 bg-white/40 border border-orange-200/60 shadow-2xl mt-[160px] rounded-3xl backdrop-blur-xl flex flex-col md:flex-row justify-between gap-10 md:gap-16 relative overflow-hidden">
        {/* Decorative Glass Bubbles */}
        <span className="absolute -top-8 -left-8 w-24 h-24 bg-white/30 rounded-full blur-2xl opacity-60 pointer-events-none"></span>
        <span className="absolute -bottom-10 right-0 w-28 h-28 bg-orange-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></span>
        <span className="absolute top-1/2 left-1/2 w-12 h-12 bg-orange-100/40 rounded-full blur-xl opacity-30 pointer-events-none"></span>
        {/* Image */}
        <div className="md:w-1/2 w-full flex justify-center items-center">
          <img
            src={import.meta.env.VITE_BACKEND_URL + recipe.photo}
            alt={recipe.title}
            className="w-full max-w-xs sm:max-w-sm md:max-w-xs h-auto object-cover"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 w-full flex flex-col justify-center text-orange-900 font-serif mt-6 md:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 tracking-wide text-orange-300 drop-shadow capitalize">
            {recipe.title}
          </h1>

          <h3 className="text-lg sm:text-xl mb-2 text-orange-900 font-light">
            Ingredients
          </h3>
          <ul className="list-none space-y-2 font-medium mb-4">
            {(recipe.ingredient || []).map((ingredient, index) => (
              <li key={index} className="capitalize text-orange-200">
                {index + 1}. {ingredient}
              </li>
            ))}
          </ul>

          <h3 className="text-base sm:text-lg font-light mt-4 mb-2 text-orange-900">
            Description
          </h3>
          <p className="text-sm sm:text-base leading-relaxed font-light tracking-wide bg-white/30 rounded-xl px-3 py-2 mb-4 text-orange-900 backdrop-blur">
            {recipe.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => navigate("/recipes")}
              className="bg-white/60 hover:bg-orange-100 text-orange-700 font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 border border-orange-200/60 backdrop-blur"
            >
              ← Back to Recipes
            </button>
            <button
              onClick={() => navigate(`/recipe/edit/${id}`)}
              className="bg-orange-400/80 hover:bg-orange-500/90 text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 border border-white/30 backdrop-blur"
            >
              ✏️ Edit Recipe
            </button>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default RecipeDetail;
