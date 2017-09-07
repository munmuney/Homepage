// ---------- load bcrypt ---------- //
var bcrypt = require('bcrypt-nodejs');

var db = require("../../models");


module.exports = function(passport, user) {

    var User = user;
    var LocalStrategy = require('passport-local').Strategy;


    passport.serializeUser(function(user, done) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                              console.log(user);
                              console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
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
                            {id: newUser.dataValues.id*100 + 1, name: 'Social Media', boxNum: '1', 
                                iconname: 'socialmedia.gif', userId: newUser.dataValues.id}, 

                            {id: newUser.dataValues.id*100 + 2, name: 'News', boxNum: '2', 
                                iconname: 'news.gif', userId: newUser.dataValues.id},

                            {id: newUser.dataValues.id*100 + 3, name: 'Email', boxNum: '3', 
                                iconname: 'email.gif', userId: newUser.dataValues.id}, 

                            {id: newUser.dataValues.id*100 + 4, name: 'Ecommerce', boxNum: '4', 
                                iconname: 'ecommerce.gif', userId: newUser.dataValues.id},

                            {id: newUser.dataValues.id*100 + 5, name: 'Finance', boxNum: '5', 
                                iconname: 'finance.gif', userId: newUser.dataValues.id}, 

                            {id: newUser.dataValues.id*100 + 6, name: 'Video', boxNum: '6', 
                                iconname: 'video.gif', userId: newUser.dataValues.id}], 
                            {hooks: true})
                           .then(function(data){
                              // var lastgenreid = data[data.length-1].dataValues.id;
                              // for (var i = 0;  i < data.length; i++) {
                              //       data[i].dataValues.id

                              //       switch (data[i].dataValues.name) {
                              //           case ("Social Media")
                              //           break;
                              //       }


                              // }
                              // // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                              // // console.log(lastgenreid);
                              // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                              // console.log(data);
                              // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                              db.Website.bulkCreate([
                            {name: 'facebook', url: 'https://facebook.com', 
                                png: "facebook copy.jpg", GenreId: newUser.dataValues.id*100 + 1},

                            {name: 'twitter', url: 'https://twitter.com', 
                                png: "twitter copy.jpg", GenreId: newUser.dataValues.id*100 + 1},

                            {name: 'tumblr', url: 'https://tumblr.com', 
                                png: "tumblr copy.jpg", GenreId: newUser.dataValues.id*100 + 1},



                            {name: 'cnn', url: 'https://cnn.com', 
                                png: "cnn copy.jpg", GenreId: newUser.dataValues.id*100 + 2},

                            {name: 'chase', url: 'https://chase.com', 
                                png: "chase copy.jpg", GenreId: newUser.dataValues.id*100 + 2},

                            {name: 'paypal', url: 'https://paypal.com', 
                                png: "paypal copy.jpg", GenreId: newUser.dataValues.id*100 + 2},


                            {name: 'googlenews', url: 'https://googlenews.com', 
                                png: "googlenews copy.jpg", GenreId: newUser.dataValues.id*100 + 3},

                            {name: 'msn', url: 'https://msn.com', 
                                png: "msn copy.jpg", GenreId: newUser.dataValues.id*100 + 3},

                            {name: 'hulu', url: 'https://hulu.com', 
                                png: "hulu copy.jpg", GenreId: newUser.dataValues.id*100 + 3},


                            {name: 'amazon', url: 'https://amazon.com', 
                                png: "amazon copy.jpg", GenreId: newUser.dataValues.id*100 + 4},

                            {name: 'etsy', url: 'https://etsy.com', 
                                png: "etsy copy.jpg", GenreId: newUser.dataValues.id*100 + 4},

                            {name: 'ebay', url: 'https://ebay.com', 
                                png: "ebay copy.jpg", GenreId: newUser.dataValues.id*100 + 4},


                            {name: 'chase', url: 'https://chase.com', 
                                png: "chase copy.jpg", GenreId: newUser.dataValues.id*100 + 5},

                            {name: 'bankofamerica', url: 'https://bankofamerica.com', 
                                png: "bankofamerica copy.jpg", GenreId: newUser.dataValues.id*100 + 5},

                            {name: 'yahoonews', url: 'https://yahoonews.com', 
                                png: "yahoonews copy.jpg", GenreId: newUser.dataValues.id*100 + 5},


                            {name: 'netflix', url: 'https://netflix.com', 
                                png: "netflix copy.jpg", GenreId: newUser.dataValues.id*100 + 6},

                            {name: 'youtube', url: 'https://youtube.com', 
                                png: "youtube copy.jpg", GenreId: newUser.dataValues.id*100 + 6},

                            {name: 'tumblr', url: 'https://tumblr.com', 
                                png: "tumblr copy.jpg", GenreId: newUser.dataValues.id*100 + 6}
                            ]) 
                            // {name: 'News', boxNum: '2', iconname: 'news.jpg', userId: newUser.dataValues.id},
                            // { name: 'Email', boxNum: '3', iconname: 'email.jpg', userId: newUser.dataValues.id}, 
                            // {name: 'Ecommerce', boxNum: '4', iconname: 'ecommerce.jpg', userId: newUser.dataValues.id},
                            // { name: 'Finance', boxNum: '5', iconname: 'finance.jpg', userId: newUser.dataValues.id}, 
                            // {name: 'Video', boxNum: '6', iconname: 'video.jpg', userId: newUser.dataValues.id}])
                           .then(function(data){
                              // console.log(data);
                           });

                           });

          
                           // db.Website.bulkCreate([
                           //  {name: 'facebook', url: 'https://facebook.com', 
                           //      png: "facebook copy.jpg", GenreId: newUser.dataValues.id*100 + 1},

                           //  {name: 'twitter', url: 'https://twitter.com', 
                           //      png: "twitter copy.jpg", GenreId: newUser.dataValues.id*100 + 1},

                           //  {name: 'tumblr', url: 'https://tumblr.com', 
                           //      png: "tumblr copy.jpg", GenreId: newUser.dataValues.id*100 + 1},



                           //  {name: 'cnn', url: 'https://cnn.com', 
                           //      png: "cnn copy.jpg", GenreId: newUser.dataValues.id*100 + 2},

                           //  {name: 'chase', url: 'https://chase.com', 
                           //      png: "chase copy.jpg", GenreId: newUser.dataValues.id*100 + 2},

                           //  {name: 'paypal', url: 'https://paypal.com', 
                           //      png: "paypal copy.jpg", GenreId: newUser.dataValues.id*100 + 2},


                           //  {name: 'googlenews', url: 'https://googlenews.com', 
                           //      png: "googlenews copy.jpg", GenreId: newUser.dataValues.id*100 + 3},

                           //  {name: 'msn', url: 'https://msn.com', 
                           //      png: "msn copy.jpg", GenreId: newUser.dataValues.id*100 + 3},

                           //  {name: 'hulu', url: 'https://hulu.com', 
                           //      png: "hulu copy.jpg", GenreId: newUser.dataValues.id*100 + 3},


                           //  {name: 'amazon', url: 'https://amazon.com', 
                           //      png: "amazon copy.jpg", GenreId: newUser.dataValues.id*100 + 4},

                           //  {name: 'etsy', url: 'https://etsy.com', 
                           //      png: "etsy copy.jpg", GenreId: newUser.dataValues.id*100 + 4},

                           //  {name: 'ebay', url: 'https://ebay.com', 
                           //      png: "ebay copy.jpg", GenreId: newUser.dataValues.id*100 + 4},


                           //  {name: 'chase', url: 'https://chase.com', 
                           //      png: "chase copy.jpg", GenreId: newUser.dataValues.id*100 + 5},

                           //  {name: 'bankofamerica', url: 'https://bankofamerica.com', 
                           //      png: "bankofamerica copy.jpg", GenreId: newUser.dataValues.id*100 + 5},

                           //  {name: 'yahoonews', url: 'https://yahoonews.com', 
                           //      png: "yahoonews copy.jpg", GenreId: newUser.dataValues.id*100 + 5},


                           //  {name: 'netflix', url: 'https://netflix.com', 
                           //      png: "netflix copy.jpg", GenreId: newUser.dataValues.id*100 + 6},

                           //  {name: 'youtube', url: 'https://youtube.com', 
                           //      png: "youtube copy.jpg", GenreId: newUser.dataValues.id*100 + 6},

                           //  {name: 'tumblr', url: 'https://tumblr.com', 
                           //      png: "tumblr copy.jpg", GenreId: newUser.dataValues.id*100 + 6}
                           //  ]) 
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

                // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                // console.log(user);
                // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

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