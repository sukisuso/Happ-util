/**
 * 
 */
var main = angular.module("main", ['ngRoute']);

main.controller("mainController", function appController($scope,$location, userService, $http){

	$scope.UserName = "";
	$scope.noValidadas = 0;
	$scope.newMensajes = 0;
	$scope.$on('$viewContentLoaded', function() {
		if(userService.auth()){
			$scope.$parent.isLogged= true;
			$scope.UserName= userService.getUser().user;
			$http({
				url: '/transaction/getNumberTransactionsNoValidadas',
				method: "POST",
				data: {'gestorId':userService.getUser()._id}
			})
			.then(function(result) {
				$scope.noValidadas = result.data;
			});

			$http({
				url: '/messages/count/'+userService.getUser()._id,
				method: "POST",
			})
			.then(function(result) {
				$scope.newMensajes = result.data;
			});
		}else{
			$location.url("/");
		}
	});

	$scope.loadModuleUsers = function loadModuleUsers(){
		$location.url("/users");
	}

	$scope.loadModuleCalendar = function loadModuleCalendar(){
		$location.url("/calendar");
	}

	$scope.loadModuleMensajes = function loadModuleMensajes(){
		$location.url("/mensajes");
	}

	$scope.loadModulePortal = function loadModulePortal(){
		$location.url("/portal");
	}

	$scope.loadModuleSettings = function loadModulePortal(){
		$location.url("/settings");
	}

	$scope.loadModuleValidar = function loadModulePortal(){
		$location.url("/validar");
	}
});
