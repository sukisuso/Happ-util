var multer = require('multer');
var uploading = multer({
  dest: __dirname + '../../tmp',
  limits: {fileSize: 10000000, files:1},
});
var type = uploading.single('recfile');
var fs = require('fs');

var Document = null;
var ObjectId =null;
var logger =null;

function StartPaths(app, mongoose, log){
	Document = require('../models/Document')(mongoose);
	ObjectId = mongoose.Types.ObjectId;
	logger = log;

	app.post('/documents/upload',type, upload);
	app.get('/documents/get/:idDocument', get);
	app.post('/documents/getAllDocuments',getAll);
	app.post('/documents/delete',deleteDoc);
}

function upload(req, res) {
	logger.log('info', '/documents/upload - ' +req.file.originalname);
	var sv = new Document({
		clientId: req.body.clientId,
		gestorId: req.body.gestorId,
		filename: req.file.originalname,
		size: req.file.size,
		date: new Date(),
	 	file: {data: fs.readFileSync(req.file.path),
	 	contentType: req.file.mimetype}
	});
	
	sv.save(function (err) {
		if (!err) {
			res.send(true);
			res.end();
		} else {
			logger.log('error',err);
			res.status(500).send({ error: '[Error: Servers Mongo] No se ha podido guardar el documento.'});
			res.end();
		}
	});
}


function get(req, res) {
	logger.log('info', '/documents/get/:idDocument - idDocument:' +req.params.idDocument);
  	Document.findOne({_id: ObjectId(req.params.idDocument)},function (err, doc) {
		if (!err) {
			res.setHeader('Content-Type', 'application/pdf');
			res.type('pdf'); 
			res.send(doc.file.data);
		} else {
			logger.log('error',err);
			res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
			res.end();
		}
	});
}

function getAll (req, res){
	logger.log('info', '/documents/getAllDocuments - clientId:' +req.body.clientId);
	Document.count({clientId:req.body.clientId}, function( err, count){
	   Document.find({clientId:req.body.clientId},'filename size date' ,{sort:{date:-1}, skip:req.body.init, limit: req.body.page }, 
	   	function (err, docs) {
			if (!err) {
				var response = {};
				response.total =count;
				response.documents = docs;
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(response));
				res.end();
			} else {
				logger.log('error',err);
				res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
				res.end();
			}
		});
	});
}


function deleteDoc(req, res) {
	logger.log('info', '/documents/delete - ' +req.body._id);
	Document.findOneAndRemove({ _id: ObjectId(req.body._id) }, function(err) {
	  if (err) throw err;

	  	res.send(true);
		res.end();
	});
}

exports.startPaths = StartPaths;
