var authController = require('./authcontroller.js');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
	    res.redirect("/dashboard");
	});

	app.get('/signup', authController.signup);

	app.post('/signup', passport.authenticate('local-signup',  { 
		successRedirect: '/dashboard',
	    failureRedirect: '/signup'}
	));


	app.get('/signin', authController.signin);

	app.post('/signin', 
		passport.authenticate('local-signin',  { 
		successRedirect: '/dashboard',
	    failureRedirect: '/signin'}
	));

	// app.post('/signin',
 //      passport.authenticate('local-signin'),  function(req, res) {

 //       // If this function gets called, authentication was successful.
 //       // `req.user` contains the authenticated user.

 //       res.redirect('/users/' + req.user.username);
 //     });


	app.get('/dashboard', isLoggedIn, authController.dashboard);

	// for CRUD
	// app.post('/dashboard', function(req, res) {

	// })

	app.get('/logout', authController.logout);



	function isLoggedIn(req, res, next) {
		// console.log("!)!)!)!)!)!)!)!)!)!)!)!)!)!)!)!)!");
	 //    console.log(req.user);
	 //    console.log("!)!)!)!)!)!)!)!)!)!)!)!)!)!)!)!)!");

	    if (req.isAuthenticated())
	        return next();

	    res.redirect('/signin');
	}

}






