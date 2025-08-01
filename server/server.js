const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const routersRecipes = require("./Routes/router");
const loginAndRegisterRoute = require("./Routes/registerRoute");
const commentRoute = require("./Routes/commentRoute");

const app = express();

// ✅ Dynamically handle frontend URL from .env
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map(origin => origin.trim());

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Routes
app.use("/api/recipes", routersRecipes);
app.use("/api", loginAndRegisterRoute);
app.use("/api/text", commentRoute);

// DB Connection & Server Start
mongoose
  .connect(process.env.MONGO_URl)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(process.env.PORT || 9000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 9000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

module.exports = app;
