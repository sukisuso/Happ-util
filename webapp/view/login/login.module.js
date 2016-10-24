/**
 * 
 */
var login = angular.module("login", ['ngRoute', 'ngMaterial', 'ngMessages']);

login.controller("loginController", function loginController($scope, $location,$rootScope,$mdToast, $http, userService){

	$scope.nick = "";
	$scope.pass = "";

	$scope.loginUser = function () {
		
		$http({
	        url: '/login/processLogin',
	        method: "POST",
	        data: { 'user' : $scope.nick, "pasword": $scope.pass}
	    })
       .then(function(result) {
       		if(result.data){
	       	 	userService.setUser(result.data);
				$rootScope.$broadcast('userLogged', "User is logged");
				$location.url("/main");
				newToast($mdToast, "Welcome "+result.data.user+"!");
			}else{
				newToast($mdToast, "Error User/password");
			}
        });
	};


});

