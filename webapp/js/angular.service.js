 
app.service('userService', function() {
	  var user = {};

	  var setUser = function(newObj) {
	    user = newObj;
	    newObj['lastLogin'] = new Date();
	    localStorage.setItem('happ-user', JSON.stringify(newObj));
	  };

	  var getUser = function(){
	      return user;
	  };

	  var auth = function (){
	  	if(!user._id){
	  		var userStg = JSON.parse(localStorage.getItem('happ-user'));
	  		if(!securitySesionTime(userStg.lastLogin)){
	  			return false;
	  		}

	  		var res = JSON.parse($.ajax({
		        type: "POST",
		        url: '/login/processAuth',
	          	data: { 'user' : userStg.user, "pasword": userStg.pasword},
		        async: false
		    }).responseText);

		    if(!res){
		    	return false;
		    }else{
		    	user=res;
		    	user['lastLogin'] = userStg.lastLogin;
		    	return true;
		    }
	  	}else{
	  		return true;
	  	}
	  }

	  return {
	  	  auth: auth,
		  setUser: setUser,
		  getUser: getUser
	  };

	});

app.service('calendarService', function() {
	  var data = null;

	  var refresh = function (){data = null;};
	  var get = function(id, gestorId){

	  	if(data == null){
	  		data = {};
	  		var res = JSON.parse($.ajax({
		        type: "POST",
		        url: '/agenda/getCitas',
		        data: {
	          		'gestorId': gestorId
	        	},
		        async: false
		    }).responseText);	
	  		 res.forEach(function (item) {
	  		 	if(!data[new Date(item.date).getTime()+""])
	          		data[new Date(item.date).getTime()+""] = item;
	          	else
	          		data[new Date(item.date).getTime()+""].desc += '</br>'+item.desc;
	        });
	  	}

	  	if(data[new Date(id).getTime()+""]){
      		return "<p>"+data[new Date(id).getTime()+""].desc+"</p>";	
	  	}else{
	  		return '';
	  	}
	  };

	  var getObj= function (id){
	  	return data[new Date(id).getTime()+""];
	  }

	  return {
	  	refresh: refresh,
		get: get,
		getObj:getObj
	  };

	});

