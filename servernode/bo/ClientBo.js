/**
* Mongo CRUD Clientes - REST
* Jesus Juan Aguilar. 2016 - jesusjuanaguilar@gmail.com
*
* Documentacion Mongoose: https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/

var Client = null;
var ObjectId = null;

function StartPaths(app, mongoose){
	Client = require('../models/Client')(mongoose);
	ObjectId = mongoose.Types.ObjectId;

	app.post('/clients/getAllClients', function(req, res) {getAllClients(req,res);});
	app.post('/clients/insertClient', function(req, res) {insertClient(req,res);});
	app.post('/clients/deleteClient', function(req, res) {deleteClient(req,res);});
	app.post('/clients/updateClient', function(req, res) {updateClient(req,res);});
}

function getAllClients(req, res) {


	Client.find({gestorId : req.body.gestorId}, function (err, docs) {
		if (!err) {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(docs));
			res.end();
		} else {
			res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
			res.end();
		}
	});
}
						
function insertClient(req, res) {
	var sv = new Client({

		gestorId: req.body.gestorId,
	    name: req.body.name,
	    surname: req.body.surname,
	    type: req.body.type,
	    email: req.body.email,
	    dni: req.body.dni,
	    direccion: req.body.direccion,
	    localidad: req.body.localidad,
	    telefono: req.body.telefono,
	    postal: req.body.postal,
	    comentario: req.body.comentario,
	    numero: req.body.numero,
	    cuota: req.body.cuota
	});
	
	sv.save(function (err) {
		if (!err) {
			res.send(true);
			res.end();
		} else {
			res.status(500).send({ error: '[Error: Servers Mongo] No se ha podido insertar.'});
			res.end();
		}
	});
	
}

function deleteClient(req, res) {
	Client.findOneAndRemove({ _id: ObjectId(req.body._id) }, function(err) {
	  if (err) throw err;

	  	res.send(true);
		res.end();
	});
}


exports.startPaths = StartPaths;
