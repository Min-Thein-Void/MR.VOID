const express = require("express");
const app = express();
const routersRecipes = require("./Routes/router");
const loginAndRegisterRoute = require("./Routes/registerRoute");
const commentRoute = require("./Routes/commentRoute")
const morgan = require("morgan");
require("dotenv").config();
app.use(morgan("dev"));
app.use(express.static("Public"));
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
const mongoose = require("mongoose");
const recipe = require("./Model/Recipe");
let url =
  "mongodb+srv://TunTun:1234@kokothein.tbnlb.mongodb.net/?retryWrites=true&w=majority&appName=KoKoThein";
mongoose.connect(url).then(() => {
  console.log("Connected to DB");
  app.listen(process.env.PORT || 9000, () => {
    console.log("App is running on port 9000");
  });
});
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json(recipe);
});
app.use(express.json());
app.use("/api/recipes", routersRecipes);
app.use("/api", loginAndRegisterRoute);
app.use("/api/text", commentRoute);

