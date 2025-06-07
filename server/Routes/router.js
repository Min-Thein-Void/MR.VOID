const express = require("express");
const upload = require("../Helper/upload");
const recipesController = require("../Controller/controller");
const { body } = require("express-validator");
const expressValidatorMessage = require("../Middlewares/expressValidatorMessage");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");
const router = express.Router();


router.get("", AuthMiddleware, recipesController.index);
router.post(
  "",
  [
    body("title").notEmpty(),
    body("ingredient").notEmpty().isArray({ min: 3 }),
    body("description").notEmpty(),
  ],
  expressValidatorMessage,
  recipesController.store
);
router.get("/:id", recipesController.show);
router.post(
  "/:id/upload",
  [
    upload.single("photo"),
    body("photo").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("photo is required...");
      }
      if (!req.file.mimetype.startsWith("image")) {
        throw new Error("photo must be image...");
      }
      return true;
   }),
  ],
  expressValidatorMessage,
  recipesController.upload
);
router.delete("/:id", recipesController.destroy);
router.patch("/:id", recipesController.update);
module.exports = router;
