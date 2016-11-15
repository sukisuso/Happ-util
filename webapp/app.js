
var app = angular.module('app', ['ngRoute','login', 'main', 'users', 'calendar',
							'client', 'mensajes', 'portal', 'documents', 'settings', 'validar']);

app.config(function($routeProvider, $compileProvider){
 	$compileProvider.debugInfoEnabled(true);

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

	.when("/client/:param1/", {
		 templateUrl : "view/client/client.html",
		 controller : "clientController"
	})

	.when("/mensajes", {
		 templateUrl : "view/mensajes/mensajes.html",
		 controller : "mensajesController"
	})

	.when("/stats/:param1/", {
		 templateUrl : "view/stats/stats.html",
		 controller : "statsController"
	})

	.when("/portal", {
		 templateUrl : "view/portal/portal.html",
		 controller : "portalController"
	})

	.when("/documents/:param1/", {
		 templateUrl : "view/documents/documents.html",
		 controller : "documentsController"
	})

	.when("/settings", {
		 templateUrl : "view/settings/settings.html",
		 controller : "settingsController"
	})

	.when("/validar", {
		 templateUrl : "view/validar/validar.html",
		 controller : "validarController"
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



