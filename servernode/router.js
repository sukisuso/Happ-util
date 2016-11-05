
/*
 * Router 
 * Jesús Juan Aguilar 03/2016
 * */
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/happ");
var log = require('./helpers/log');
 
var login = require('./bo/LoginBo');
var client = require('./bo/ClientBo');
var transactions = require('./bo/TransactionsBo');
var agenda = require('./bo/AgendaBo');
var documents = require('./bo/DocumentsBo');

function route(app) {
	
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
		res.end();
	});
	
	
	client.startPaths(app, mongoose, log);
	login.startPaths(app, mongoose, log);
	transactions.startPaths(app, mongoose, log);
	agenda.startPaths(app, mongoose, log);
	documents.startPaths(app, mongoose, log);

	log.info('Routes loaded.');
}

exports.redirect = route;