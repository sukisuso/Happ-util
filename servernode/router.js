
/*
 * Router 
 * Jesús Juan Aguilar 03/2016
 * */
var login = require('./bo/LoginBo');
var client = require('./bo/ClientBo');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/happ");

function route(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
		res.end();
	});
	
	
	client.startPaths(app, mongoose);
	login.startPaths(app, mongoose);
}

exports.redirect = route;