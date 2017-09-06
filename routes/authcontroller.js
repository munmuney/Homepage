var path = require("path");


var exports = module.exports = {}


exports.signup = function(req,res){

	res.render('signup'); 

}

exports.signin = function(req,res) {

	res.render('signin'); 
    //res.sendFile(path.join(__dirname, "../views/signin.html"));

}

exports.dashboard = function(req,res){

	res.render('dashboard'); 

}

exports.logout = function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/signin');
  });

}