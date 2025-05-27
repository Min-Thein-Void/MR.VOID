const express = require("express");

const { body } = require("express-validator");
const expressValidatorMessage = require("../Middlewares/expressValidatorMessage");

const commentController = require("../Controller/commentController");

const router = express.Router();

router.post(
  "/comments",
  [body("text").notEmpty()],
  expressValidatorMessage,
  commentController.comment
);

module.exports = router;
