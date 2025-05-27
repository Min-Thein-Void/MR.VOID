import React from "react";
import RecipeCard from "../Main Components/RecipeCard";
import useRecipe from "../Custom/useRecipe";

function Recipes() {
 
  let {
    recipe,
    loading,
    error,
    currentPage,
    recipesPerPage,
    setSearchTerm,
    searchTerm,
    fetchRecipes,
    setRecipe,
    setCurrentPage
  } = useRecipe();

  const recipeDeleted = (_id) => {
    setRecipe((prev) => prev.filter((one) => one._id !== _id));
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipe.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipe.length / recipesPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };
  return (
    <div className="bg-orange-950">
      <div className="max-w-7xl mx-auto p-6 bg-orange-950 min-h-screen">
        <div className=" text-white py-16 px-6 mb-0">
          <div className="max-w-4xl mx-auto text-center -my-9">
            <h1 className="text-4xl font-bold font-handwriting text-orange-600">
              Discover Tasty Recipes 🍽️
            </h1>
            <div className="space-x-3">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") fetchRecipes(); // search on Enter
                }}
                className="w-72 p-2 bg-white focus:outline-orange-500 mt-6 rounded-2xl text-black font-bold"
                placeholder="Search for recipes..."
              />

              <button
                onClick={fetchRecipes}
                className="ml-2 px-4 py-2 bg-orange-600 text-white rounded-2xl hover:bg-orange-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <p className="text-center text-white">Loading recipes...</p>
        )}

        {error && (
          <p className="text-center text-red-500">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe._id}
              recipeDeleted={recipeDeleted}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-md text-white font-semibold ${
                  currentPage === page
                    ? "bg-orange-600"
                    : "bg-orange-400 hover:bg-orange-500"
                } transition duration-300`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;
