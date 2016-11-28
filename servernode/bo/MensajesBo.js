/**
* Mongo CRUD Clientes - REST
* Jesus Juan Aguilar. 2016 - jesusjuanaguilar@gmail.com
*
* Documentacion Mongoose: https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/

var Mensajes = null;
var ObjectId = null;
var logger = null;

function StartPaths(app, mongoose, log){
	Mensajes = require('../models/Mensajes')(mongoose);
	ObjectId = mongoose.Types.ObjectId;
	logger = log;

	app.post('/messages/:gestorId',getAllMsg);
	app.post('/messages/delete/:id', deleteMsg);
	app.post('/messages/count/:gestorId',getCountMsg);
	app.post('/messages/status/:id', setViewTrue);
}

function getAllMsg(req, res) {
	logger.info('/messages/:'+req.params.gestorId);
	Mensajes.count({gestorId: req.params.gestorId}, function( err, count){
	   Mensajes.find({gestorId: req.params.gestorId},{} ,{ sort:{estado:1, date:-1},skip:req.body.init, limit: req.body.page })
	   .populate('clientId') 
	   .exec(function (err, docs) {
			if (!err) {
				var response = {};
				response.total =count;
				response.msg = docs;
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(response));
				res.end();
			} else {
				res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
				res.end();
			}
		});
	});

}
						
function deleteMsg(req, res) {
	logger.info('/messages/delete');
	Mensajes.findOneAndRemove({ _id: ObjectId(req.params.id) }, function(err) {
	  if (err) throw err;

	  	res.send(true);
		res.end();
	});
}

function setViewTrue (req, res){
  	Mensajes.findOneAndUpdate({ _id: ObjectId(req.params.id) },
	{ 
	 	estado: true
	}
	, function(err, user) {
	  if (err) throw err;
	  	res.send(true);
		res.end();
	});
}

function getCountMsg (req, res) {
	logger.info('/messages/count/:'+req.params.gestorId);
	Mensajes.count({gestorId: req.params.gestorId, estado: { $ne: true }}, function( err, count){
			if (!err) {
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(count));
				res.end();
			} else {
				res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
				res.end();
			}
	});
}

exports.startPaths = StartPaths;
