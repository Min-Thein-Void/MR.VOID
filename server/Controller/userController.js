const User = require("../Model/User");
const createToken = require("../Helper/createToken");

const userController = {
  me: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      return res.status(200).json(req.user);
    } catch (e) {
      return res.status(500).json({ error: "Server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      });
      return res.status(200).json({ user, token });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Name, email, and password are required" });
      }
      const user = await User.register(name, email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      });
      return res.status(201).json({ user, token });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  logout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 1, httpOnly: true, sameSite: "lax" });
    return res.status(200).json({ message: "User logged out" });
  },
};

module.exports = userController;
