 
app.service('userService', function() {
	  var user = {};

	  var setUser = function(newObj) {
	      user = newObj;
	  };

	  var getUser = function(){
	      return user;
	  };

	  return {
		  setUser: setUser,
		  getUser: getUser
	  };

	});

app.service('clientService', function() {
	  var client = {};

	  var setClient = function(newObj) {
	      client = newObj;
	  };

	  var getClient = function(){
	      return client;
	  };

	  return {
		  setUser: setUser,
		  getUser: getUser
	  };

	});

