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


  app.post("/genres", function(req, res) {
    db.Genre.create(req.body).then(function(dbGenre) {
      res.json(dbGenre);
    });
  });


  // app.post("/users", function(req, res) {

  //   db.User.create(req.body).then(function(dbUser) {

  //      return db.Genre.bulkcreate([{ name: 'Social Media', boxNum: '1', iconname: 'socialmedia.jpg' }])
  //    }).then(function())

  //       db.Website.bulkcreate([{name: , url: }, {}, ])


  //       db.Genre.create({ name: 'News', boxNum: '2', iconname: 'socialmedia.jpg' }).then(function(genre){

  //       db.Website.create({name: , url: });
  //         db.Website.create({name: , url: });
  //         db.Website.create({name: , url: });
       

  //       db.Genre.create({ name: 'Email', boxNum: '3', iconname: 'socialmedia.jpg' }).then(function(genre){
  //         db.Website.create({name: , url: });
  //         db.Website.create({name: , url: });
  //         db.Website.create({name: , url: });
  //       });

  //       db.Genre.create({ name: 'eCommerce', boxNum: '4', iconname: 'socialmedia.jpg' }).then(function(genre){
  //         db.Website.create({name: , url: });
  //         db.Website.create({name: , url: });
  //         db.Website.create({name: , url: });
  //       });

  //       db.Genre.create({ name: 'Finance', boxNum: '5', iconname: 'socialmedia.jpg' }).then(function(genre){
  //         db.Website.create({name: , url: });
  //         db.Website.create({name: , url: });
  //         db.Website.create({name: , url: });
  //       });

  //       db.Genre.create({ name: 'Video', boxNum: '6', iconname: 'socialmedia.jpg' }).then(function(genre){
  //         db.Website.create({name: , url: });
  //         db.Website.create({name: , url: });
  //         db.Website.create({name: , url: });
  //       });   

  //     res.json(dbUser);
  //   });
  // });


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
