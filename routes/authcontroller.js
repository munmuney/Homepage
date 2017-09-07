var path = require("path");


var exports = module.exports = {}


exports.signup = function(req,res){

	res.render('signup', {id: req.user}); 

}

exports.signin = function(req,res) {

	res.render('signin', {id: req.user}); 
    //res.sendFile(path.join(__dirname, "../views/signin.html"));

}

exports.dashboard = function(req,res){
	
	res.render('dashboard', {id: req.user}); 

}

exports.logout = function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/signin');
  });

}