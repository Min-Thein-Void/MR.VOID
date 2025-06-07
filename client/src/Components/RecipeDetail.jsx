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
        const res = await axios.get(`/api/text/comments/recipe/${id}`); // Update this endpoint as per your backend
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
    <div className="w-full px-6 py-10 bg-orange-950 min-h-screen">
      {/* Recipe Section */}
      <div className="max-w-7xl mx-auto p-8 bg-orange-900 shadow-2xl rounded-lg flex flex-col md:flex-row justify-between gap-16">
        {/* Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={import.meta.env.VITE_BACKEND_URL + recipe.photo}
            alt={recipe.title}
            className="w-full h-auto hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 w-full flex flex-col justify-center text-white font-serif">
          <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
            {recipe.title}
          </h1>

          <h3 className="text-3xl font-bold mb-4 text-orange-200">
            Ingredients
          </h3>
          <ul className="list-disc list-inside space-y-3 text-xl font-medium">
            {(recipe.ingredient || []).map((ingredient, index) => (
              <li key={index} className="capitalize">
                {index + 1}. {ingredient}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold mt-8 mb-3 text-orange-200">
            Description
          </h3>
          <p className="text-lg leading-relaxed font-light tracking-wide">
            {recipe.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={() => navigate("/recipes")}
              className="bg-orange-100 hover:bg-orange-200 text-orange-800 font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300"
            >
              ← Back to Recipes
            </button>

            <button
              onClick={() => navigate(`/recipe/edit/${id}`)}
              className="bg-white hover:bg-orange-100 text-orange-800 font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300"
            >
              ✏️ Edit Recipe
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto mt-12 bg-orange-900 text-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6">Comments</h2>

        <div className="space-y-4 mb-6">
        {comments.map((comment) => {
  return <p key={comment._id}>{comment.text}</p>;
})}

        </div>

        {/* Comment Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave a comment..."
          className="w-full h-32 p-4 rounded-md bg-orange-800 text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        ></textarea>
        <button
          onClick={postComment}
          className="mt-4 bg-orange-200 text-orange-900 font-bold py-2 px-6 rounded-full hover:bg-orange-300 transition-all duration-300"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail;
