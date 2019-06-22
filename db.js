const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://appdb:appdb@cluster0-zl9j0.mongodb.net/UserManager",
  {
    useNewUrlParser: true
  }
);

const userSchema = mongoose.Schema({
  id: String,
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  age: Number
});

const user = mongoose.model("User", userSchema);

function addUser(user, callback) {
  user.save((err, data) => {
    if (err) {
      return console.error(err);
    }
    console.log(`new user: ${data}`);
  });
  callback();
}

function editUser(userData, callback) {
  user.updateOne(
    { _id: userData.id },
    {
      username: `${userData.username}`,
      firstname: `${userData.firstname}`,
      lastname: `${userData.lastname}`,
      email: `${userData.email}`,
      age: userData.age
    },
    {},
    (err, res) => {
      if (err) {
        console.error(err);
      }
    }
  );
  callback();
}

function deleteUser(id) {
  //remove user from db that has the given id
  user.deleteOne({ _id: `${id}` }, {}, err => {
    console.error(err);
  });
}

module.exports = { user, deleteUser, addUser, editUser };
