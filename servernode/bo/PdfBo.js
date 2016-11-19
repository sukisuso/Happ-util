var jsreport = require('../../report');
var moment = require('moment');
var ejs = require('ejs');
var fs = require('fs');
var TPL_PATH = __dirname + '../../../report/tpl/';
var input   = '<div>Hello, this is <?= it.name ?> :)</div>';

var model = null;
var Transaction = null;
var ObjectId = null;
var log = null;

function StartPaths(app, mongoose, logger){
	log = logger;
	Transaction = getModelTransactions(mongoose);

	app.post('/pdf/getNewUserDoc', getNewUserDoc);
	app.post('/pdf/getFacturacion', getFacturacion);
}

function getNewUserDoc(req, res) {
	log.info('/pdf/getNewUserDoc');
	debugger
	fs.readFile(TPL_PATH + 'newUser.tpl.html', 'utf8', function (err,data) {
	  if (err) {
	    return log.error(err);
	  }
	  var output = ejs.render( data, {it: req.body});
	  jsreport.printPdf(res, output, 'nuevo-usuario');
	});
}

function getFacturacion(req, res){
	log.info('/pdf/getFacturacion');
	fs.readFile(TPL_PATH + 'facturas.tpl.html', 'utf8', function (err,data) {
	  if (err) {
	    return log.error(err);
	  }
	  transactionToFacturacion(req.body, res, data);
	});
}

exports.startPaths = StartPaths;


function transactionToFacturacion (body, res, data) {
	Transaction.find({"clientId" : body._id},{} ,{sort:{date:1}},function (err, docs) {
		if (!err) {
			for (var i = 0; i < docs.length; i++) {
				docs[i].fecha =  moment(docs[i].date).format("DD/MM/YYYY");
			};

			body.facturacion = docs;
			var output = ejs.render( data, {it:body});
	  		jsreport.printPdf(res, output, 'facturacion');
		} else {
			res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
			res.end();
		}
	});
}


function getModelTransactions (mongoose) {
	var trans = mongoose.model('Transactions');

	if(!trans){
		trans = require('../models/Transactions')(mongoose);
	}

	return trans;
}