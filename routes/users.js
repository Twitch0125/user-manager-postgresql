var express = require("express");
var router = express.Router();

// let userData = require('../public/users.json');
const UserData = require('../UserData')

/* GET users listing. */
router.get("/users", function(req, res, next) {
  res.render("users", {userData: UserData});
});

module.exports = router;
