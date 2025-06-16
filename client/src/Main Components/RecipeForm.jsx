import React, { useEffect, useState } from "react";
import axios from "../../Helper/axios";
import { useNavigate, useParams } from "react-router-dom";

function RecipeCreateForm() {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const addRecipe = (e) => {
    e.preventDefault();
    setIngredient((prev) => [newIngredient, ...prev]);
    setNewIngredient("");
  };

  const removeRecipe = (e) => {
    e.preventDefault();
    setIngredient([]);
  };

  const uploadFile = (e) => {
    let file = e.target.files[0];
    setFile(file);

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };

    fileReader.readAsDataURL(file);
  };

  const submit = async (e) => {
    try {
      e.preventDefault();
      const recipe = {
        title,
        description,
        ingredient,
      };

      let res;

      if (id) {
        res = await axios.patch(`/api/recipes/${id}`, recipe);
      } else {
        res = await axios.post("/api/recipes", recipe);
      }

      if (res.status === 200) {
        navigate("/recipes");
      }

      let formData = new FormData();
      formData.set("photo", file);

      const uploadImageRes = await axios.post(
        `/api/recipes/${res.data._id}/upload`,
        formData,
        {
          Headers: {
            Accept: "multipart/formData",
          },
        }
      );
      console.log(uploadImageRes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await axios.get(`/api/recipes/${id}`);
          if (res.status === 200) {
            setTitle(res.data.title);
            setIngredient(res.data.ingredient);
            setDescription(res.data.description);
            setPreview(import.meta.env.VITE_BACKEND_URL + res.data.photo);
          }
        } catch (error) {
          console.log("Error fetching recipe:", error);
        }
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-300 px-2 py-8">
      <div className="w-full max-w-2xl mx-auto mt-[140px] p-6 sm:p-10 bg-white/40 border border-orange-200/60 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden text-orange-900">
        {/* Decorative Glass Bubbles */}
        <span className="absolute -top-8 -left-8 w-24 h-24 bg-white/30 rounded-full blur-2xl opacity-60 pointer-events-none"></span>
        <span className="absolute -bottom-10 right-0 w-28 h-28 bg-orange-200/40 rounded-full blur-3xl opacity-40 pointer-events-none"></span>
        <span className="absolute top-1/2 left-1/2 w-12 h-12 bg-orange-100/40 rounded-full blur-xl opacity-30 pointer-events-none"></span>

        <h2 className="text-3xl sm:text-4xl font-bold text-center text-orange-900 mb-8 drop-shadow-lg">
          Recipe {id ? "Edit" : "Create"} Form
        </h2>

        <form>
          {/* Recipe Image Upload */}
          <div className="mb-6 flex flex-col items-center">
            <input
              type="file"
              onChange={uploadFile}
              className="mb-2 text-orange-900"
            />
            {preview && (
              <img
                src={preview}
                className="w-64 h-40 object-contain rounded-xl border border-orange-100 shadow bg-white/50 backdrop-blur mb-2"
                alt="Preview"
              />
            )}
          </div>

          {/* Recipe Title */}
          <div className="mb-6">
            <label
              className="block text-orange-700 font-semibold mb-1"
              htmlFor="title"
            >
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 mt-2 bg-white/60 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-orange-300 text-orange-900 shadow-md backdrop-blur"
              placeholder="Enter recipe title"
            />
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <label
              className="block text-orange-700 font-semibold mb-1"
              htmlFor="ingredients"
            >
              Ingredients
            </label>
            <div className="flex items-center space-x-3 mt-2">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                className="w-full px-4 py-2 bg-white/60 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-orange-300 text-orange-900 shadow-md backdrop-blur"
                placeholder="Add ingredient"
              />
              <button
                disabled={!newIngredient}
                className="p-1 px-3 bg-orange-400/80 rounded-full text-2xl text-white hover:bg-orange-500/90 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                onClick={addRecipe}
                type="button"
              >
                +
              </button>
              <button
                className="p-1 px-3 bg-red-400/80 rounded-xl text-2xl text-white hover:bg-red-500/90 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                onClick={removeRecipe}
                type="button"
              >
                ×
              </button>
            </div>
            <div className="mt-4">
              <p className="font-semibold text-orange-800">Ingredients:</p>
              <ul className="list-decimal pl-5 text-orange-700 font-bold">
                {ingredient.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recipe Description */}
          <div className="mb-6">
            <label
              className="block text-orange-700 font-semibold mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 mt-2 bg-white/60 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition placeholder-orange-300 text-orange-900 shadow-md backdrop-blur"
              placeholder="Enter recipe description"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              onClick={submit}
              className="px-8 py-3 bg-orange-400/80 hover:bg-orange-500/90 text-white font-semibold rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition text-base backdrop-blur border border-white/30"
            >
              {id ? "Update" : "Create"} Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeCreateForm;
