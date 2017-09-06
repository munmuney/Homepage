// ---------- load bcrypt ---------- //
var bcrypt = require('bcrypt-nodejs');

var db = require("../../models");


module.exports = function(passport, user) {

    var User = user;
    var LocalStrategy = require('passport-local').Strategy;


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    // ----- deserialize the user ----- //
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        }).catch(function(err) {
            done(err, false);
        });
    });

    // ---------- Local SignUp ---------- //
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            // ----- function to create hash for user's password ----- //
            var generateHash = function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            };

            // ----- looks for username ----- //
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {

                // ----- checks if username was taken ----- //
                if (user) {
                    return done(null, false, {

                        message: 'That username is already taken'
                    });
                } 
                else {

                    // ----- stores user's input ----- //
                    var data = {
                        email: req.body.email,
                        password: generateHash(password),
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username
                    };

                    // ----- creates new user homepage ----- //
                    User.create(data).then(function(newUser) {

                         // console.log(newUser);
                           db.Genre.bulkCreate([
                            {name: 'Social Media', boxNum: '1', iconname: 'socialmedia.jpg', userId: newUser.dataValues.id}, 
                            {name: 'News', boxNum: '2', iconname: 'news.jpg', userId: newUser.dataValues.id},
                            { name: 'Email', boxNum: '3', iconname: 'email.jpg', userId: newUser.dataValues.id}, 
                            {name: 'Ecommerce', boxNum: '4', iconname: 'ecommerce.jpg', userId: newUser.dataValues.id},
                            { name: 'Finance', boxNum: '5', iconname: 'finance.jpg', userId: newUser.dataValues.id}, 
                            {name: 'Video', boxNum: '6', iconname: 'video.jpg', userId: newUser.dataValues.id}], {hooks: true})
                           .then(function(data){
                              console.log(data);
                           });

          
                           // db.Website.bulkCreate([
                            // { name: 'facebook', url: 'https://facebook.com', png: "facebook copy.jpg", genreId: }, 
                           //  // {name: 'News', boxNum: '2', iconname: 'news.jpg', userId: newUser.dataValues.id},
                           //  // { name: 'Email', boxNum: '3', iconname: 'email.jpg', userId: newUser.dataValues.id}, 
                           //  // {name: 'Ecommerce', boxNum: '4', iconname: 'ecommerce.jpg', userId: newUser.dataValues.id},
                           //  // { name: 'Finance', boxNum: '5', iconname: 'finance.jpg', userId: newUser.dataValues.id}, 
                           //  // {name: 'Video', boxNum: '6', iconname: 'video.jpg', userId: newUser.dataValues.id}])
                           // .then(function(data){
                           //    // console.log(data);
                           // });




                        if (!newUser) {
                            done(null, false);
                        }

                        if (newUser) {
                            done(null, newUser);
                        }

                    // ----- catch error for creating new user ----- //
                    }).catch(function(err) {
                        throw err;
                    });
                }

            // ----- catch error for users input ----- //
            }).catch(function(err) {
                throw err;
            });
        }));

    // ---------- Local SignIn ---------- //
    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            var User = user;

            // ----- function to check if password is valid ----- //
            var isValidPassword = function(userpass, password) {
                return bcrypt.compareSync(password, userpass);
            }

            // ----- looks for username ----- //
            User.findOne({
                where: {
                    username: username
                }
            }).then(function(user) {

                // ----- checks if username exist ----- //
                if (!user) {
                    return done(null, false, {
                        message: 'Username does not exist'
                    });
                }

                // ----- checks if password is valid ----- //
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }

                // ----- checks the user data ----- //
                var userinfo = user.get();
                return done(null, userinfo);

            // ----- catch error for users signin ----- // 
            }).catch(function(err) {
                throw err;
                return done(null, false, {
                    message: 'Something went wrong with SignIn'
                });
            });
        }
    ));
}