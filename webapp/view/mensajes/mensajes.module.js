/**
 * 
 */
var mensajes = angular.module("mensajes", ['ngRoute', 'ngMaterial', 'ngMessages', 'cl.paging']);

mensajes.controller("mensajesController", function appController($scope,$location, $mdDialog,$http,$mdToast, userService){
	$scope.rowCollection = [];
	$scope.paging = {
	   total: 100,
	   current: 1,
	   size:10,
	   onPageChanged: loadPages,
	};

    $scope.$on('$viewContentLoaded', function() {
	    if(!userService.auth()){
	        $location.url("/");
	    } else{
	    	$scope.$parent.isLogged= true;
	    }  
	});

    function loadPages() {
   		$scope.rowCollection =[{date:'25/10/2016', origin:'Jesus Juan Aguilar', subject:'Goteras'}]
  	}

  	$scope.goBack = function goBack(){
   		$location.url("/main");
   }
});
