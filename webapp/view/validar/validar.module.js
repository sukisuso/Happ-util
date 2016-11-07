/**
 * 
 */
var validar = angular.module("validar", ['ngRoute', 'ngMaterial', 'ngMessages', 'cl.paging']);

validar.controller("validarController", function ($scope,$location, $mdDialog,$http,$mdToast, userService){
	$scope.goBack = function goBack(){
   		$location.url("/main");
   }

   $scope.rowCollection = [];
	$scope.paging = {
		total: 100,
		current: 1,
		size: 10,
		onPageChanged: loadPages,
	};

	$scope.$on('$viewContentLoaded', function() {
		if (!userService.auth()) {
			$location.url("/");
		} else{
			$scope.$parent.isLogged= true;
		}
	});

	function loadPages() {
		$http({
			url: '/transaction/getAllTransactionsNoValidadas',
			method: "POST",
			data: {
				'gestorId': userService.getUser()._id,
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
			$scope.rowCollection = $scope.rowCollection.concat(result.data.docs);
		});
	}


	$scope.edittransaction = function(row, ev) {
		$mdDialog.show({
				controller: DialogEditTransactionController,
				templateUrl: 'view/client/modal/transaccion.tpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: false, 
				locals: {
					content:row
				}
			})
			.then(function(data) {
				$scope.EditTransPetition(data)
			});
	};

	function DialogEditTransactionController($scope, $mdDialog, content) {
		$scope.tran = content;
		$scope.tran.date = new Date (content.date);
		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		$scope.answer = function() {
			$mdDialog.hide(this.tran);
		};
	}

	$scope.EditTransPetition = function newTransPetition(data) {
		if (userService.getUser()._id) {
			debugger
			data['gestorId'] = userService.getUser()._id;
			data['clientId'] = data.clientId._id;
			//send petition
			$http({
					url: '/transaction/updateTransactions',
					method: "POST",
					data: data
				})
				.then(function(result) {
					if (result.data) {
						newToast($mdToast, "Transacción edtiada.");
						loadPages();
					} else {
						newToast($mdToast, "Error editando transacción.");
					}
				});
		}
	};

	$scope.deleteItem = function deleteItem(row) {
		$http({
				url: '/transaction/deleteTransactions',
				method: "POST",
				data: {
					'_id': row._id
				}
			})
			.then(function(result) {
				if (result.data) {
					newToast($mdToast, "Transacción eliminada.");
					loadPages();
				} else {
					newToast($mdToast, "Error eliminando transacción.");
				}
			});

	};

	$scope.validateTransaction = function validateTransaction(row){
		if (userService.getUser()._id) {
			row['gestorId'] = userService.getUser()._id;
			row['clientId'] = row.clientId._id;
			row['validation'] = true;
			//send petition
			$http({
					url: '/transaction/updateTransactions',
					method: "POST",
					data: row
				})
				.then(function(result) {
					if (result.data) {
						newToast($mdToast, "Transacción validada.");
						loadPages();
					} else {
						newToast($mdToast, "Error validando transacción.");
					}
				});
		}
	};
});