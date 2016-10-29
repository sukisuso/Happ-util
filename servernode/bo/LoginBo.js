/**
* Mongo CRUD LOGIN - REST
* Jesus Juan Aguilar. 2016 - jesusjuanaguilar@gmail.com
*
* Documentacion Mongoose: https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/

var User = null;
var ObjectId =null;
var crypt = require('../helpers/crypto');
var crypto = require('crypto');

function StartPaths(app, mongoose){
	User = require('../models/User')(mongoose);
	ObjectId = mongoose.Types.ObjectId;

	app.post('/login/processLogin', function(req, res) {processLogin(req,res);});
	app.post('/login/insertUser', function(req, res) {insertUser(req,res);});
}

function processLogin(req, res) {
	authentication(req.body.user, req.body.pasword, res);
}
						
function insertUser(req, res) {
	var sv = new User({
		user: req.body.user,
	    pasword: req.body.pasword,
	    roles:req.body.roles    
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

function authentication (username, password, res){
  User.findOne({'user': username},
     function(err, user) {

       if (err){
       	 res.send(false);
	  	 res.end();
       }

       if (!user){
       		res.send(false);
	   		res.end();
       }else {
	       if (crypt.encrypt(password) === user.pasword){
	     		res.setHeader('Content-Type', 'application/json');
				res.send(user);
				res.end();
	       }else{
	       		res.send(false);
		   		res.end();
		   }
		}
     }
   );
}

exports.startPaths = StartPaths;
