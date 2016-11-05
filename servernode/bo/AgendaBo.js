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
	res.send([]);
	res.end();
}

function insertCita(req, res) {
	

}


function deleteCita(req, res) {
	
}

exports.startPaths = StartPaths;
