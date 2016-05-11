var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 3000;

function compile(str, path){
	return stylus(str).set('filename', path);
}

var app = express();
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if(env === "development"){
	mongoose.connect('mongodb://localhost/polling');
}else{
	mongoose.connect('mongodb://jhi5:1337SNKj@ds015869.mlab.com:21182/polling');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
	console.log('multivision db opened');
});

app.get('/partials/:partialPath', function(req, res){
	res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
	res.render('index');
});

app.listen(PORT, function(req, res){
	console.log("Listening...");
});

s