/**
* Mongo CRUD Clientes - REST
* Jesus Juan Aguilar. 2016 - jesusjuanaguilar@gmail.com
*
* Documentacion Mongoose: https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/

var Transaction = null;
var ObjectId = null;

function StartPaths(app, mongoose){
	Transaction = require('../models/Transactions')(mongoose);
	ObjectId = mongoose.Types.ObjectId;

	app.post('/transaction/getAllTransactions', getAllTransactions);
	app.post('/transaction/getAll', getAll);
	app.post('/transaction/insertTransactions', insertTransactions);
	app.post('/transaction/deleteTransactions', deleteTransactions);
	app.post('/transaction/updateTransactions', updateTransactions);
	app.post('/transaction/getAllTransactionsForStats', getAllTransactionsForStats);
	
}

function getAllTransactions(req, res) {

	Transaction.count({"clientId" : req.body.clientId}, function( err, count){
	   Transaction.find({"clientId" : req.body.clientId},{} ,{sort:{date:-1}, skip:req.body.init, limit: req.body.page }, 
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
function getAll(req, res) {

   Transaction.find({"clientId" : req.body.clientId},{} ,{sort:{date:1}},function (err, docs) {
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
						
function insertTransactions(req, res) {
	var sv = new Transaction({

		gestorId: req.body.gestorId,
	    clientId: req.body.clientId,
	    date: req.body.date,
	    cant: req.body.cant,
	    type: req.body.type,
	    desc: req.body.desc,
	    validation: req.body.validation
	});

	
	sv.save(function (err) {
		debugger
		if (!err) {
			res.send(true);
			res.end();
		} else {
			res.status(500).send({ error: '[Error: Servers Mongo] No se ha podido insertar.'});
			res.end();
		}
	});
	
}

function deleteTransactions(req, res) {
	Transaction.findOneAndRemove({ _id: ObjectId(req.body._id) }, function(err) {
	  if (err) throw err;

	  	res.send(true);
		res.end();
	});
}

function updateTransactions(req, res) {
	
	Transaction.findOneAndUpdate({ _id: ObjectId(req.body._id) },
	 { 
	 	gestorId: req.body.gestorId,
	    clientId: req.body.clientId,
	    date: req.body.date,
	    cant: req.body.cant,
	    type: req.body.type,
	    desc: req.body.desc,
	    validation: req.body.validation
	 }
	, function(err, user) {
	  if (err) throw err;
	  	res.send(true);
		res.end();
	});
}

function getAllTransactionsForStats(req, res) {

   Transaction.find({"clientId" : req.body.clientId},{} ,{}, 
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

}

exports.startPaths = StartPaths;
