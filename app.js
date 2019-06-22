var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const fs = require("fs");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var editRouter = require("./routes/edit");
var uuidv1 = require("uuid/v1");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");

const User = mongoose.model("User", {
  id: String,
  username: String,
  name: String,
  email: String,
  age: Number
});

const UserData = require("./UserData");

const User = require("./User");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", indexRouter);
//handle form data from index form
app.post("/addUser", (req, res, next) => {
  let id = uuidv1(),
    username = req.body.username,
    name = req.body.name,
    email = req.body.email,
    age = req.body.age;
  let user = new User(id, username, name, email, age);
  UserData.users.push(user);
  writeToJSON(); //writes to JSON file stored in /public

  next(res.redirect("/users"));
});
app.get("/users", usersRouter);
app.get("/edit", editRouter);
app.post("/editUser", (req, res, next) => {
  //get data from form
  let id = req.body.id,
    username = req.body.username,
    name = req.body.name,
    email = req.body.email,
    age = req.body.age;
  //delete the old user
  UserData.users = UserData.users.filter(user => user.id != id);
  //create new user and store it
  let newUser = new User(id, username, name, email, age);
  UserData.users.push(newUser);
  writeToJSON();
  res.redirect("/users");
});
//receives a query string
///?id= #given id
app.get("/deleteUser", (req, res, next) => {
  let id = req.query.id;
  UserData.users = UserData.users.filter(user => user.id != id);
  writeToJSON();
  next(res.redirect("/users"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

function writeToJSON() {
  //storing in users.json file in /public
  let usersStream = fs.createWriteStream("public/users.json");
  usersStream.write(JSON.stringify(UserData.users), err => {
    if (err) console.log("error writing userJSON");
    else console.log("userJSON write successful");
    usersStream.end();
  });
}

module.exports = app;
