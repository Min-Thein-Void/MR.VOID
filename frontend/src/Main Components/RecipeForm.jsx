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
    console.log(file);
    setFile(file);

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      console.log(e.target.result);
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
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl mt-4 mb-4">
      <h2 className="text-4xl font-bold text-center text-orange-600 mb-6">
        Recipe {id ? "Edit" : "Create"} Form
      </h2>

      <form>
        {/* Recipe Title */}
        <div className="mb-6">
          <input type="file" onChange={uploadFile} />
          {preview && (
            <img src={preview} className="w-96 h-64 object-contain" />
          )}
          <label
            className="block text-orange-700 font-semibold mt-4"
            htmlFor="title"
          >
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition ease-in-out duration-300"
            placeholder="Enter recipe title"
          />
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <label
            className="block text-orange-700 font-semibold"
            htmlFor="ingredients"
          >
            Ingredients
          </label>

          <div className="flex items-center space-x-4 mt-2">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition ease-in-out duration-300"
            />
            <button
              disabled={!newIngredient}
              className="p-1 px-3 bg-orange-500 rounded-full text-3xl text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transition ease-in-out duration-300"
              onClick={addRecipe}
            >
              +
            </button>
            <button
              className="p-1 px-3 bg-red-500 rounded-xl text-3xl text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition ease-in-out duration-300"
              onClick={removeRecipe}
            >
              x
            </button>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-orange-800">Ingredients:</p>
            <ul className="list-decimal pl-5 text-orange-600 font-bold">
              {ingredient.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recipe Description */}
        <div className="mb-6">
          <label
            className="block text-orange-700 font-semibold"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition ease-in-out duration-300"
            placeholder="Enter recipe description"
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            onClick={submit}
            className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-md shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition ease-in-out duration-300"
          >
            {id ? "Update" : "Create"} Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecipeCreateForm;
