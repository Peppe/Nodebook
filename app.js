
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var book = require('./routes/book');
var http = require('http');
var path = require('path');

// Database
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/nodebook", {native_parser:true});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*app.get('/', routes.index); */
app.post('/add', book.add(db)); // Create
app.get('/persons', book.users(db)); // Read
app.post('/update', book.update(db)); // Update
app.post('/delete/:id', book.delete(db)); // Delete

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
