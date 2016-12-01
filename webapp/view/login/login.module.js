/**
 * 
 */
var login = angular.module("login", ['ngRoute', 'ngMaterial', 'ngMessages']);

login.controller("loginController", function loginController($scope, $location,$rootScope,$mdDialog,$mdToast, $http, userService){

	$scope.nick = "";
	$scope.pass = "";

	$scope.$on('$viewContentLoaded', function() {
	    if (!userService.auth()) {
	      $location.url("/");
	    }else{
	      $scope.$parent.isLogged= true;
	      $location.url("/main");
	    }
	});

	$scope.loginUser = function (isLoged) {
		
		$http({
	        url: '/login/processLogin',
	        method: "POST",
	        data: { 'user' : $scope.nick, "pasword": $scope.pass, 'isLoged': isLoged}
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

	$scope.registrarseModal = function(ev) {
		$mdDialog.show({
				controller: DialogController,
				templateUrl: 'view/login/newUserModal.tpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: false
			})
			.then(function(data) {
				$scope.newUserPetition(data)
			});
	};

	function DialogController($scope, $mdDialog) {
		$scope.newUser = {};
		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		$scope.answer = function() {
			$mdDialog.hide(this.newUser);
		};
	}

	$scope.newUserPetition = function newUserPetition(data) {
		if(data.password !== data.password2){
			newToast($mdToast, "Las contraseñas no coinciden");
			return;
		}

		$http({
	        url: '/login/insertUser',
	        method: "POST",
	        data: data
	    })
       .then(function(result) {
       		if(!result.data){
       			newToast($mdToast, "Existe un usuario con ese nombre.");
       		}else{
       			newToast($mdToast, "Usuario creado correctamente.");
       		}
        });
	};
});

