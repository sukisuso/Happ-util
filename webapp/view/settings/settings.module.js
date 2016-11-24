/**
 * 
 */
var settings = angular.module("settings", ['ngRoute', 'ngMaterial', 'ngMessages', 'cl.paging']);

settings.controller("settingsController", function ($scope,$location, $routeParams,$mdDialog,$http,$mdToast, userService){
	$scope.options={
		gestorId: userService.getUser()._id,
		portales: {
	    	info:false ,
	    	transacciones:false ,
	    	stats: false ,
	    	mensajes:false ,
	    	documentos: false 
	    }
	}

	$scope.goBack = function goBack(){
		var opt = $scope.options;
		$http({
				url: '/opciones',
				method: "POST",
				data: $scope.options
			});
   		$location.url("/main");
   	}	

   $scope.$on('$viewContentLoaded', function() {
		if (!userService.auth()) {
			$location.url("/");
		} else {
			$scope.$parent.isLogged= true;
			$http({
				url: '/opciones/' + userService.getUser()._id,
				method: "GET",
			}).then(function(result) {
				if(result.data != null){
					$scope.options = result.data;
				}
			});
		}
	});

});