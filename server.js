var express        = require('express');
var app            = express();
var passport       = require('passport');
var session        = require('express-session');
var bodyParser     = require('body-parser');
var cp             = require('cookie-parser');
var env            = require('dotenv').load();
var methodOverride = require("method-override");

var exphbs 		   = require('express-handlebars');

var PORT = process.env.PORT || 3000;

// ----- BodyParser ----- //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


 // ----- Passport ----- //
app.use(session({ 
    secret: process.env.session_password || "some password secret here to secure signin sessions",
    resave: true, 
    saveUninitialized:true
})); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(express.static(__dirname + "/views"));
//app.use(methodOverride("_method"));
//app.use(cp());



 // ----- Handlebars ----- //
app.set('views', './views')
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');




// ----- Models ----- //
var models = require("./models");


// ---- Routes ----- //
require('./routes/auth.js')(app, passport);
// require("./routes/html-routes.js")(app);
require("./routes/genre-routes.js")(app);
// require("./routes/website-routes.js")(app);

// ----- load passport strategies ----- //
require('./config/passport/passport.js')(passport, models.user);


// ----- Sync Database ----- //
models.sequelize.sync({force: true}).then(function() {
    app.listen(PORT, function(err) {
        if (!err) console.log("Port Number is: " + PORT); 
        else console.log(err);
    });
}).catch(function(err) {
    console.log(err,"Something went wrong with the Database Update!")
});

