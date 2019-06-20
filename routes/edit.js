var express = require("express");
var router = express.Router();

const UserData = require("../UserData");

router.get("/edit", function(req, res, next) {
  let targetID = req.query.id;
  let targetUser = UserData.users.filter(user => user.id == targetID);
  res.render("edit", { user: targetUser[0] });
});

module.exports = router;
