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

	app.post('/login/processLogin', processLogin);
	app.post('/login/insertUser', insertUser);
	app.post('/login/processAuth', processAuth);
}

function processLogin(req, res) {
	authentication(req.body.user, req.body.pasword, res);
}
						
function insertUser(req, res) {
	var sv = new User({
		user: req.body.user,
	    pasword: crypt.encrypt(req.body.password),
	    roles:req.body.roles ,   
	    email: req.body.email  ,
        dni: req.body.dni  ,
        direccion: req.body.direccion  ,
        localidad: req.body.localidad  ,
        telefono: req.body.telefono  ,
        postal: req.body.postal  ,
        gestora: req.body.gestora  ,
        account: req.body.account  ,
	});

	User.findOne({'user': req.body.user},
     function(err, user) {

       if (err){
       	 res.send(false);
	  	 res.end();
       }
       debugger
       if (user){
       		res.send(false);
	   		res.end();
       }else {
	      sv.save(function (err) {
	      		debugger
				if (!err) {
					res.send(true);
					res.end();
				} else {
					res.send(false);
	   				res.end();
				}
			});	
		}
     }
   );
	
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

function processAuth(req, res){
	 User.findOne({'user': req.body.user, 'pasword': req.body.pasword},
     function(err, user) {

       if (err){
       	 res.send(false);
	  	 res.end();
       }

       if (!user){
       		res.send(false);
	   		res.end();
       }else {
			res.send(user);
		}
     }
   );
}

exports.startPaths = StartPaths;
