var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var morgan = require('morgan');

var app = express();

//Connecting to mongodb.
var configDB = require('./server/config/database.js');
mongoose.connect(configDB.url);

require('./server/config/passport.js')(passport);

//set up express application.
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

//Routes.
require('./server/routes.js')(app, passport);

app.listen('3000', function(){
	console.log("Server is running on port 3000.");
});