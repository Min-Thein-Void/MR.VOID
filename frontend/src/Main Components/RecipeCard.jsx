import React from "react";
import axios from "../../Helper/axios";
import { Link } from "react-router-dom";

function RecipeCard({ recipe, recipeDeleted }) {
  let deleteRecipe = async () => {
    let res = await axios.delete("/api/recipes/" + recipe._id);
    if (res.status === 200) {
      recipeDeleted(recipe._id);
    }
  };

  return (
   <Link to={`/recipe_detail/${recipe._id}`}>
    <div
      key={recipe.title}
      className="bg-black p-4 rounded-2xl shadow-inner shadow-orange-600 transition-transform cursor-pointer w-full max-w-xs mx-auto mb-6"
    >
      <h2 className="text-2xl text-orange-400 text-center mb-4 font-handwriting capitalize">
        {recipe.title}
      </h2>

      <img
        src={import.meta.env.VITE_BACKEND_URL + recipe.photo}
        alt="photo"
        className="mx-auto w-44 h-44 mb-4 object-cover rounded-md hover:scale-110 transition-transform duration-300"
      />

      <div className="mb-3">
        <h3 className="text-base font-bold font-mono text-orange-400 mb-1">
          Ingredients:
        </h3>
        <ul className="pl-3 space-y-1">
          {(recipe.ingredient || []).map((ingredient, index) => (
            <li
              key={index}
              className="text-orange-500 font-light font-display text-sm capitalize"
            >
              {index + 1 + ". "} {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-orange-500 font-thin font-display text-sm mb-2">
        Your Description:
      </p>
      <p className="text-white capitalize font-mono text-xs text-opacity-85 mb-3">
        {recipe.description}
      </p>

      <div className="flex justify-end space-x-3 mt-4">
        <Link
          to={`/recipe/edit/${recipe._id}`}
          className="bg-black border border-white text-white text-sm font-display px-4 py-1.5 rounded hover:text-orange-500 hover:scale-105 transition"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={deleteRecipe}
          className="bg-black text-white text-sm px-4 py-1.5 rounded hover:text-orange-500 hover:scale-105 transition"
        >
          🗑 Delete
        </button>
      </div>
    </div>
   </Link>
  );
}

export default RecipeCard;
