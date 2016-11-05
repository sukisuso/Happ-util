/**
 * 
 */
var portal = angular.module("portal", ['ngRoute', 'ngMaterial', 'ngMessages', 'cl.paging']);

portal.controller("portalController", function ($scope,$location, $mdDialog,$http,$mdToast, userService){
	$scope.rowCollection = [];
	$scope.paging = {
	   total: 100,
	   current: 1,
	   size:10,
	   onPageChanged: loadPages,
	};

	$scope.filters = {
	    name: "",
	    portal: "",
  	};

    $scope.$on('$viewContentLoaded', function() {
	    if(!userService.getUser()._id){
	        $location.url("/");
	    }   
	});

    function loadPages() {
   		$http({
				url: '/clients/getPortales',
				method: "POST",
				data: {
					'gestorId': userService.getUser()._id,
					'init': ($scope.paging.current - 1) * $scope.paging.size,
					'page': $scope.paging.size,
					'filters': $scope.filters
				}
			})
			.then(function(result) {
				$scope.rowCollection = [];
				$scope.paging.total = Math.floor(result.data.total / $scope.paging.size);
				if (result.data.total % $scope.paging.size) {
					$scope.paging.total++;
				}
				$scope.rowCollection = $scope.rowCollection.concat(result.data.clients);
			});
  	}

  	$scope.goBack = function goBack(){
   		$location.url("/main");
   }

   $scope.openPortal = function openPortal(row){
   		window.open("http://localhost/portal/"+row.entity);
   }

   $scope.deletePortal= function deletePortal(row){
   		$http({
			url: '/clients/deleteEntity',
			method: "POST",
			data: {
				'_id': row._id
			}
		})
		.then(function(result) {
			 loadPages();
		});
   }

   $scope.filtrar = function() {
    loadPages();
  }

  $scope.clean = function() {
    $scope.filters = {
      name: "",
      portal: "",
    };
  }
});