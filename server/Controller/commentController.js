const Comment = require("../Model/Comments");
const recipe = require("../Model/Recipe")

const commentController = {
    comment: async (req, res) => {
    const id =  req.params.id;
    const { text } = req.body;
     const recipeId = await recipe.findById(id);
    const comment = await Comment.create({
      text,
      recipeId
    });
    console.log(req.body);
    res.status(200).json(comment);
  },
};

module.exports = commentController;
