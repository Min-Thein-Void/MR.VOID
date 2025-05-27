const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    uniqued: true,
  },
  password: {
    type: String,
    required: true,
  },
});
UserSchema.statics.register = async function (name, email, password) {
  const userExist = await this.findOne({ email });
  if (userExist) {
    throw new Error("email already exist!");
  }
  const salt = await bcrypt.genSalt(); 
  const hashValue = await bcrypt.hash(password, salt); 
  let user = await this.create({
    name,
    email,
    password: hashValue,
  });
  return user;
};
UserSchema.statics.login = async function (email, password) {
  let user = await this.findOne({ email });
  if (!user) {
    throw new Error("user does not exists");
  }
  let isCorrect = await bcrypt.compare(password, user.password);
  if (isCorrect) {
    return user;
  } else {
    throw new Error("Password incorrect");
  }
};
let User = mongoose.model("User", UserSchema);
module.exports = User;
