//IN PROGRESS!!!

var db = require("../models");

module.exports = function(app) {
  app.get("/websites", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Website.findAll({
      include: [db.Website]
    }).then(function(dbWebsite) {
      res.json(dbWebsite);
      // console.log(dbWebsite);
    });
  });


  app.post("/websites", function(req, res) {
    db.Website.create(req.body).then(function(dbWebsite) {
      console.log(dbWebsite);
      res.json(dbWebsite);
    });
  });
}

