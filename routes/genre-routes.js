//IN PROGRESS!!!


var db = require("../models");

module.exports = function(app) {
  app.get("/genres", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Genre.findAll({
      include: [db.Website]
    }).then(function(dbGenre) {
      res.json(dbGenre);
      // console.log(dbGenre);
    });
  });



  // app.post("/api/authors", function(req, res) {
  //   db.Genre.create(req.body).then(function(dbGenre) {
  //     res.json(dbGenre);
  //   });
  // });

  // app.delete("/api/authors/:id", function(req, res) {
  //   db.Genre.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbGenre) {
  //     res.json(dbGenre);
  //   });
  // });

};
