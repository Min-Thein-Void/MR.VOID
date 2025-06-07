const RemoveFile = require("../Helper/RemoveFile");
const recipe = require("../Model/Recipe");
const recipesController = {
  index: async (req, res) => {
    try {
      const searchQuery = req.query.search;
      let recipes;

      if (searchQuery) {
        recipes = await recipe.find({
          title : { $regex: searchQuery, $options: "i" },
        });
      } else {
        recipes = await recipe.find();
      }

      res.send(recipes);
    } catch (error) {
      res.status(500).send({ error: "Something went wrong" });
    }
  },
  store: async (req, res) => {
    let { title, ingredient, description } = req.body;
    const singleRecipe = await recipe.create({
      title,
      ingredient,
      description,
    });
    console.log(req.body);
    res.json(singleRecipe);
  },
  show: async (req, res) => {
    const id = req.params.id;
    try {
      const recipeId = await recipe.findById(id);
      if (!recipeId) {
        return res.status(404).json({ message: "Recipes not found" });
      }
      res.json(recipeId);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recipe", error });
    }
  },
  destroy: async (req, res) => {
    const id = req.params.id;
    const deleteRecipe = await recipe.findByIdAndDelete(id);
    RemoveFile(__dirname + "/../Public" + deleteRecipe.photo);
    res.json({ message: "recipe deleted!" });
  },
  update: async (req, res) => {
    const id = req.params.id;
    let { title, ingredient, description } = req.body;
    let updateRecipe = await recipe.findByIdAndUpdate(id, {
      title,
      ingredient,
      description,
    });
    res.json(updateRecipe);
  },
  upload: async (req, res) => {
    try {
      const id = req.params.id;
      let updateRecipe = await recipe.findByIdAndUpdate(id, {
        photo: "/" + req.file.filename,
      });
      RemoveFile(__dirname + "/../Public" + updateRecipe.photo);
      return res.json(updateRecipe);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "internal server error..." });
    }
  },
};
module.exports = recipesController;
