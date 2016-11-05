/**
 * 
 */
var documents = angular.module("documents", ['ngRoute', 'ngMaterial', 'ngMessages', 'cl.paging']);

documents.controller("documentsController", function ($scope,$location,$routeParams, $mdDialog,$http,$mdToast, userService){

	$scope.idClient = $routeParams.param1;
	$scope.clientInfo = null;
	$scope.fileToUpdate = null;
	$scope.rowCollection = [];
	$scope.paging = {
		total: 100,
		current: 1,
		size: 10,
		onPageChanged: loadPages,
	};

	$scope.$on('$viewContentLoaded', function() {
		if (!userService.getUser()._id) {
			$location.url("/");
		} else {

			$http({
				url: '/clients/getOneClient',
				method: "POST",
				data: {
					'clienId': $scope.idClient
				}
			}).then(function(result) {
				if (result.data) {
					$scope.clientInfo = result.data;
					loadPages();
				} else {
					newToast($mdToast, "Error cargando cliente.");
				}
			});
		}
	});

  	$scope.goBack = function goBack(){
   		$location.url("/client/"+$scope.idClient);
   }

   $scope.filesChanged = function filesChanged(element){
   	$scope.fileToUpdate = element.files[0];
   	$scope.$apply();
   }

   $scope.updateFile = function updateFile (){
   		var formData = new FormData();
		formData.append("recfile", $scope.fileToUpdate);
		formData.append("clientId", $scope.idClient);
		formData.append("gestorId", userService.getUser()._id);
   		$http({
	        url: '/documents/upload',
	        method: "POST",
	        headers: {'Content-Type': undefined},
	        data: formData
	    })
       .then(function(result) {
       		loadPages();
        });
   }

   function loadPages() {
		$http({
			url: '/documents/getAllDocuments',
			method: "POST",
			data: {
				'clientId': $scope.idClient,
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
			$scope.rowCollection = $scope.rowCollection.concat(result.data.documents);
		});
	}

	 $scope.deleteDocument= function deleteDocument (row){
		$http({
			url: '/documents/delete',
			method: "POST",
			data: {
				'_id': row._id
			}
		})
		.then(function(result) {
			 loadPages();
		});
	 }

	 $scope.viewDoc = function openPortal(row){
   		window.open("/documents/get/"+row._id);
     }
});