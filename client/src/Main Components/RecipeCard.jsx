import React from "react";
import axios from "../../Helper/axios";
import { Link } from "react-router-dom";

function RecipeCard({ recipe, recipeDeleted }) {
  let deleteRecipe = async (e) => {
    e.preventDefault(); // Prevent navigation when clicking delete
    let res = await axios.delete("/api/recipes/" + recipe._id);
    if (res.status === 200) {
      recipeDeleted(recipe._id);
    }
  };

  return (
    <Link to={`/recipe_detail/${recipe._id}`}>
      <div
        key={recipe.title}
        className="relative bg-white/40 border border-orange-200/60 rounded-2xl shadow-2xl backdrop-blur-xl transition-transform cursor-pointer w-full max-w-xs mx-auto mb-6 overflow-hidden hover:scale-[1.025]"
        style={{
          boxShadow: "0 8px 32px 0 rgba(251,146,60,0.13)",
        }}
      >
        {/* Decorative Glass Bubbles */}
        <span className="absolute -top-8 -left-8 w-20 h-20 bg-white/30 rounded-full blur-2xl opacity-60 pointer-events-none"></span>
        <span className="absolute -bottom-8 right-0 w-24 h-24 bg-orange-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></span>
        <span className="absolute top-1/2 left-1/2 w-10 h-10 bg-orange-100/40 rounded-full blur-xl opacity-30 pointer-events-none"></span>

        <div className="relative z-10 p-4 flex flex-col">
          <h2 className="text-2xl text-orange-900 text-center mb-4 font-handwriting capitalize drop-shadow font-light">
            {recipe.title}
          </h2>

          <img
            src={import.meta.env.VITE_BACKEND_URL + recipe.photo}
            alt="photo"
            className="mx-auto w-40 h-40 mb-4 object-cover"
          />

          <div className="mb-3">
            <h3 className="text-base font-bold font-mono text-orange-900 mb-1">
              Ingredients:
            </h3>
            <ul className="pl-3 space-y-1">
              {(recipe.ingredient || []).map((ingredient, index) => (
                <li
                  key={index}
                  className="text-orange-300 font-light font-display text-sm capitalize"
                >
                  {index + 1 + ". "} {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-orange-900 font-semibold font-display text-sm mb-2">
            Your Description:
          </p>
          <p className="text-orange-900 capitalize font-mono text-xs text-opacity-85 mb-3 bg-white/30 rounded-lg px-2 py-1 backdrop-blur">
            {recipe.description}
          </p>

          <div className="flex justify-end space-x-3 mt-4">
            <Link
              to={`/recipe/edit/${recipe._id}`}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/60 border border-orange-200/70 text-orange-700 text-xs font-display px-4 py-1.5 rounded-xl shadow hover:bg-orange-100/80 hover:text-orange-900 hover:scale-105 transition backdrop-blur"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={deleteRecipe}
              className="bg-white/60 border border-orange-200/70 text-orange-700 text-xs px-4 py-1.5 rounded-xl shadow hover:bg-orange-100/80 hover:text-orange-900 hover:scale-105 transition backdrop-blur"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
