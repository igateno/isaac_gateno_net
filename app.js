// Module dependencies
var express = require('express');
var Blog = require('./providers/blog').Blog;

var app = module.exports = express.createServer();

require('./config')(app, express); // configuration

require('./routes')(app); // routes

app.listen(3000);
console.log("Express server listening on port %d in %s mode",
  app.address().port, app.settings.env);
