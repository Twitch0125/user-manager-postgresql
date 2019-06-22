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

function addUser(user) {
  user.save((err, data) => {
    if (err) {
      return console.error(err);
    }
    console.log(`new user: ${data}`);
  });
}

function editUser(userData) {
  user.update(
    { _id: userData.id },
    {
      username: `${userData.username}`,
      firstname: `${userData.firstname}`,
      lastname: `${userData.lastname}`,
      email: `${userData.email}`,
      age: userData.age
    }
  );
}

function deleteUser(id) {
  //remove user from db that has the given id
  user.deleteOne({ _id: `${id}` }, {}, err => {
    console.error(err);
  });
}

module.exports = { user, deleteUser, addUser, editUser };
