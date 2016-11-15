var jsreport = require('../../report');
var ejs = require('ejs');
var fs = require('fs');
var TPL_PATH = __dirname + '../../../report/tpl/';
var input   = '<div>Hello, this is <?= it.name ?> :)</div>';

var model = null;
var ObjectId = null;
var log = null;

function StartPaths(app, mongoose, logger){
	log = logger;
	app.get('/pdf/getNewUserDoc', getNewUserDoc);
	app.get('/pdf/getFacturacion', getFacturacion);
	app.get('/pdf', getEstado);
}

function getNewUserDoc(req, res) {
	log.info('/pdf/getNewUserDoc');
	fs.readFile(TPL_PATH + 'newUser.tpl.html', 'utf8', function (err,data) {
	  if (err) {
	    return log.error(err);
	  }
	  var output = ejs.render( data, {it: {gestor:'Gestoria Martinez'}});
	  jsreport.printPdf(res, output, 'nuevo-usuario');
	});
}

function getFacturacion(req, res){
	log.info('/pdf/getFacturacion');
	fs.readFile(TPL_PATH + 'facturas.tpl.html', 'utf8', function (err,data) {
	  if (err) {
	    return log.error(err);
	  }
	  var output = ejs.render( data, {it:{facturacion:[
	  		{date:'10/10/2016', cant:200, type:'Ingreso', desc:'Ninguno'},
	  		{date:'11/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'12/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'13/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'14/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'15/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'16/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'17/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'18/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'19/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'20/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'21/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'22/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'23/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'24/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'25/10/2016', cant:5, type:'Gasto', desc:'Ninguno'}
	  	]}});
	  jsreport.printPdf(res, output, 'facturacion');
	});
}

function getEstado (req, res){
	log.info('/pdf/getEstado');
	fs.readFile(TPL_PATH + 'status.tpl.html', 'utf8', function (err,data) {
	  if (err) {
	    return log.error(err);
	  }
	  data = '<script>var serie = {name:"Francisco Vicente", data:[700, 500]};</script>'+data; 


	  var output = ejs.render( data, {it:{stat:{name:"Francisco Vicente", data:[700, 500]},
	  	facturacion:[
	  		{date:'10/10/2016', cant:200, type:'Ingreso', desc:'Ninguno'},
	  		{date:'11/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'12/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'13/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'14/10/2016', cant:5, type:'Gasto', desc:'Ninguno'},
	  		{date:'15/10/2016', cant:5, type:'Gasto', desc:'Ninguno'}
	  	]}});
	  jsreport.printPdf(res, output, 'estado');
	});
}

exports.startPaths = StartPaths;
