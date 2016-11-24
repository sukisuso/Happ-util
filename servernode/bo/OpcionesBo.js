/*
{
    "_id" : ObjectId("56911dcf79f4175c0adbc19a"),
    "start" : "2016-02-05",
    "title" : "Dentista 17:00",
    "cita" : true
}
*/

var Opciones = null;
var ObjectId = null;
var logger =null;

function StartPaths(app, mongoose, log){
	Opciones = require('../models/Opciones')(mongoose);
	ObjectId = mongoose.Types.ObjectId;
	logger = log;

	app.get('/opciones/:gestorId', get);
	app.post('/opciones', saveOrUpdate);
}

function get(req, res) {
	logger.log('info', 'GET-opciones/:' +req.params.gestorId);


	 Opciones.findOne({"gestorId" : req.params.gestorId},{} ,{sort:{date:1}},function (err, docs) {
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

function saveOrUpdate(req, res) {
	logger.log('info', 'POST-opciones/' +req.body.gestorId);
	
	if(req.body._id){
		delete req.body._id;
	}

	Opciones.update({gestorId: req.body.gestorId}, req.body, {upsert: true, setDefaultsOnInsert: true}, function (error, doc){
		res.status(200);
		res.end();
	});
	
}

exports.startPaths = StartPaths;
