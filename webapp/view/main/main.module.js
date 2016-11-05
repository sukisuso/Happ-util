/**
 * 
 */
var main = angular.module("main", ['ngRoute']);

main.controller("mainController", function appController($scope,$location, userService){

	$scope.UserName= "";
	$scope.$on('$viewContentLoaded', function() {
		if(userService.getUser()._id){
			$scope.UserName= userService.getUser().user;
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
});
