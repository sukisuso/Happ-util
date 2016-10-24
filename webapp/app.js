
var app = angular.module("app", ['ngRoute','login', 'main', 'users', 'calendar', 'client']);

app.config(function($routeProvider){
	$routeProvider.when("/", {
		 templateUrl : "view/login/login.html",
		 controller : "loginController"
	})
	
	.when("/main", {
		 templateUrl : "view/main/main.html",
		 controller : "mainController"
	})

	.when("/users", {
		 templateUrl : "view/users/users.html",
		 controller : "usersController"
	})
	
	.when("/calendar", {
		 templateUrl : "view/calendar/calendar.html",
		 controller : "calendarController"
	})

	.when("/client", {
		 templateUrl : "view/client/client.html",
		 controller : "clientController"
	})
 	.otherwise({ redirectTo : "/"})
});

app.controller("appController", function appController($scope, $location){
	$scope.isLogged = false;

	$scope.$on('userLogged', function(event) {
		$scope.isLogged = true;
	});

	$scope.closeSesion = function closeSesion(){
		$scope.isLogged = false;
		$location.url("/");
	}
})



