require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var editRouter = require('./routes/edit');
const db = require('./db');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter);
//handle form data from index form
app.post('/addUser', (req, res) => {
  db.createUser(req, res);
  res.redirect('/users');
});
app.get('/users', usersRouter);
app.get('/edit', editRouter);
app.post('/editUser', (req, res) => {
  //get data from form
  const { id, username, firstname, lastname, email, age } = req.body;
  let data = { id, username, firstname, lastname, email, age };
  db.updateUser(data, () => {
    res.redirect('/users');
  });
});

//receives a query string
///?id= #given id
app.get('/deleteUser', (req, res) => {
  let id = req.query.id;
  db.deleteUser(id, () => {
    res.redirect('/users');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
