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
	app.post('/clients/getOneClient', function(req, res) {getOneClient(req,res);});
	app.post('/clients/updateEntity', function(req, res) {updateEntity(req,res);});
}

function getAllClients(req, res) {

	var query = {};
	query.gestorId = req.body.gestorId;
	if(req.body.filters.name){
		query.name = {$regex:req.body.filters.name}; 
	}
	if(req.body.filters.dni){
		query.dni ={$regex:req.body.filters.dni};
	}
	if(req.body.filters.type){
		query.type = {$regex:req.body.filters.type};
	}


	Client.count(query, function( err, count){
	   Client.find(query,{} ,{ skip:req.body.init, limit: req.body.page }, 
	   	function (err, docs) {
			if (!err) {
				var response = {};
				response.total =count;
				response.clients = docs;
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

function getOneClient(req, res){

   Client.findOne({_id: ObjectId(req.body.clienId)},function (err, docs) {
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

function updateClient(req, res) {
	Client.findOneAndUpdate({ _id: ObjectId(req.body._id) },
	 { 
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
	 }
	, function(err, user) {
	  if (err) throw err;
	  	res.send(true);
		res.end();
	});
}

function updateEntity (req, res ){
	Client.count({'entity': req.body.entity}, function( err, count){
	  	if(count > 0){
	  		res.send(false);
			res.end();
	  	}else{

		  	Client.findOneAndUpdate({ _id: ObjectId(req.body._id) },
			{ 
			 	entity:req.body.entity
			}
			, function(err, user) {
			  if (err) throw err;
			  	res.send(true);
				res.end();
			});
		}
	});
}

exports.startPaths = StartPaths;
