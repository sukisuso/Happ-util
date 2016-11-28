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
	    	loadPages();
	    }  
	});

	function loadPages() {
		$http({
			url: '/messages/'+userService.getUser()._id,
			method: "POST",
			data: {
				'init': ($scope.paging.current - 1) * $scope.paging.size,
				'page': $scope.paging.size,
			}
		})
		.then(function(result) {
			$scope.rowCollection = [];
			$scope.paging.total = Math.floor(result.data.total / $scope.paging.size);
			if (result.data.total % $scope.paging.size) {
				$scope.paging.total++;
			}
			$scope.rowCollection = $scope.rowCollection.concat(result.data.msg);
		});
	}

  	$scope.goBack = function goBack(){
   		$location.url("/main");
   }

   $scope.deleteItem = function (row){
   		$http({
			url: '/messages/delete/'+row._id,
			method: "POST",
		})
		.then(function(result) {
			loadPages();
		});
   }



  $scope.openMsgWindow = function openEditWindow(row, ev){
	$http({
		url: '/messages/status/'+row._id,
		method: "POST",
	})
	.then(function(result) {
		row.estado = true;
	});

	$mdDialog.show({
	   controller: DialogController,
	   templateUrl: 'view/mensajes/mensajes.tpl.html',
	   parent: angular.element(document.body),
	   targetEvent: ev,
	   clickOutsideToClose: true,
	   fullscreen: false,
	   locals: {
	     msg: row
	   }
	 })
	.then(function(data) {
	   $scope.updateUserPetition(data)
	});
  }

  function DialogController($scope, $mdDialog, msg) {
    $scope.msg = msg;
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function() {
      $mdDialog.hide();
    };
  }
});
