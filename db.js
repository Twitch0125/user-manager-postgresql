const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

const userSchema = mongoose.Schema({
  id: String,
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  age: Number
});

const user = mongoose.model("User", userSchema);

module.exports = { user };
