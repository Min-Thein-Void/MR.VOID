const express = require("express");

const cookie = require('cookieparser')

const {body} = require("express-validator");

const expressValidatorMessage = require('../Middlewares/expressValidatorMessage')

const routerL = express.Router();

const userController = require("../Controller/userController");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

routerL.get("/user/me",AuthMiddleware, userController.me)
routerL.post("/login", userController.login);
routerL.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("password").notEmpty(),
  ],expressValidatorMessage,
  userController.register
);
routerL.post('/logout', userController.logout)

module.exports = routerL;
