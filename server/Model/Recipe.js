const mongoose = require('mongoose');
let RecipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    ingredient: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }  
);

let recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = recipe;
