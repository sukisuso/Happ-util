/*
{
    "_id" : ObjectId("56911dcf79f4175c0adbc19a"),
    "start" : "2016-02-05",
    "title" : "Dentista 17:00",
    "cita" : true
}
*/

var Agenda = null;
var ObjectId = null;

function StartPaths(app, mongoose){
	Agenda = require('../models/Agenda')(mongoose);
	ObjectId = mongoose.Types.ObjectId;
	
	app.post('/agenda/getCitas', getCitas);
	app.post('/agenda/insertCita',insertCita);
	app.post('/agenda/deleteCita', deleteCita);
}

function getCitas(req, res) {
	 Agenda.find({"gestorId" : req.body.gestorId},{} ,{sort:{date:1}},function (err, docs) {
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

function insertCita(req, res) {
	var sv = new Agenda({

		gestorId: req.body.gestorId,
	    desc: req.body.desc,
	    date: req.body.date
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


function deleteCita(req, res) {
	Agenda.findOneAndRemove({ _id: ObjectId(req.body._id) }, function(err) {
	  if (err) throw err;
	  	res.send(true);
		res.end();
	});
}

exports.startPaths = StartPaths;
