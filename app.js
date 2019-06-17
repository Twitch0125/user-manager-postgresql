var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const fs = require("fs");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const User = require("./User");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", indexRouter);
app.post("/users", usersRouter, (req, res, next) => {
  let id = req.body.id,
    name = req.body.name,
    email = req.body.email,
    age = req.body.age;
  let user = new User(id, name, email, age);
  let userJSON = JSON.stringify(user);
  let usersStream = fs.createWriteStream("users.json", { flags: "a" });
  usersStream.write(userJSON, err => {
    if (err) console.log("error writing userJSON");
    else console.log("userJSON write successful");
    usersStream.end();
  });
  next();
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

module.exports = app;
