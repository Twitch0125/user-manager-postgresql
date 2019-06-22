var express = require("express");
var router = express.Router();
var db = require("../db");

router.get("/edit", function(req, res, next) {
  let targetID = req.query.id;
  db.user.find({ _id: targetID }, (err, user) => {
    if (err) return console.error(err);
    res.render("edit", { user: user[0] });
  });
});

module.exports = router;
