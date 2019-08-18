var express = require('express');
var app = express();
var db = require('./models/db');
var Router = require('./controllers/routes');

var port = process.env.port || 3000;

//setup /api as root route
app.use('/api', Router);

//RUN SERVER ON PORT 3000
app.listen(port);
console.log("Running server on port " + port);
