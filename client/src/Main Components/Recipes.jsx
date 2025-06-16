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
    setCurrentPage,
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
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-orange-900  py-6 px-2">
      <div className="max-w-7xl mx-auto mt-[130px]">
        {/* Search & Title Card */}
        <div className="w-full max-w-4xl mx-auto mb-10">
          <div className="relative bg-white/40 border border-orange-200/60 rounded-3xl shadow-2xl backdrop-blur-xl px-6 py-10 sm:py-14 flex flex-col items-center overflow-hidden">
            {/* Decorative Glass Bubbles */}
            <span className="absolute -top-8 -left-8 w-24 h-24 bg-white/30 rounded-full blur-2xl opacity-60 pointer-events-none"></span>
            <span className="absolute -bottom-10 right-0 w-28 h-28 bg-orange-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></span>
            <span className="absolute top-1/2 left-1/2 w-12 h-12 bg-orange-100/40 rounded-full blur-xl opacity-30 pointer-events-none"></span>
            <h1 className="text-3xl sm:text-4xl font-bold font-handwriting text-orange-900 text-center mb-4 drop-shadow">
              Discover Tasty Recipes 🍽️
            </h1>
            <div className="flex flex-row sm:flex-row items-center gap-3 w-full justify-center">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") fetchRecipes();
                }}
                className="w-72 sm:w-72 px-4 py-2 bg-white/70 border border-orange-200 rounded-2xl text-orange-900 font-semibold placeholder-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-md backdrop-blur transition"
                placeholder="Search for recipes..."
              />
              <button
                onClick={fetchRecipes}
                className="px-6 py-2 bg-orange-400/80 hover:bg-orange-500/90 text-white rounded-2xl font-semibold shadow-lg transition backdrop-blur border border-white/30"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Loading/Error */}
        {loading && (
          <p className="text-center text-orange-700 font-semibold mb-4">
            Loading recipes...
          </p>
        )}
        {error && (
          <p className="text-center text-red-500 mb-4">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
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
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-xl font-semibold shadow-md transition backdrop-blur border ${
                  currentPage === page
                    ? "bg-orange-500 text-white border-orange-400"
                    : "bg-white/60 text-orange-700 border-orange-200 hover:bg-orange-100/80 hover:text-orange-900"
                }`}
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
