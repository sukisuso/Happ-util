/**
 * 
 */
var client = angular.module("client", ['ngRoute']);

client.controller("clientController", function appController($scope, $routeParams, $mdToast, $mdDialog, $http, $location, $rootScope, userService) {

	$scope.rowCollection = [];
	$scope.paging = {
		total: 100,
		current: 1,
		size: 10,
		onPageChanged: loadPages,
	};

	function loadPages() {
		$http({
			url: '/transaction/getAllTransactions',
			method: "POST",
			data: {
				'clientId': $scope.idClient,
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
			$scope.loadStats();
		});
	}

	$scope.idClient = $routeParams.param1;
	$scope.clientInfo = null;
	$scope.$on('$viewContentLoaded', function() {
		if (!userService.auth()) {
			$location.url("/");
		} else {
			$scope.$parent.isLogged= true;
			$http({
				url: '/clients/getOneClient',
				method: "POST",
				data: {
					'clienId': $scope.idClient
				}
			}).then(function(result) {
				if (result.data) {
					$scope.clientInfo = result.data;
				} else {
					newToast($mdToast, "Error cargando cliente.");
				}
			});
		}
	});

	$scope.goBack = function goBack() {
		$location.url("/users");
	};


	$scope.showtransaction = function(ev) {
		$mdDialog.show({
				controller: DialogTransactionController,
				templateUrl: 'view/client/modal/transaccion.tpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: false
			})
			.then(function(data) {
				$scope.newTransPetition(data)
			});
	};

	function DialogTransactionController($scope, $mdDialog) {
		$scope.tran = {};
		$scope.tran.date = null;
		$scope.tran.cant = null;
		$scope.tran.desc = null;
		$scope.tran.type = null;
		$scope.tran.validation = null;
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

	$scope.newTransPetition = function newTransPetition(data) {
		if (userService.getUser()._id) {
			data['gestorId'] = userService.getUser()._id;
			data['clientId'] = $scope.idClient;
			//send petition
			$http({
					url: '/transaction/insertTransactions',
					method: "POST",
					data: data
				})
				.then(function(result) {
					if (result.data) {
						newToast($mdToast, "Transacción registrada.");
						loadPages();
					} else {
						newToast($mdToast, "Error añadiendo transacción.");
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

	$scope.showComent = function(ev) {
		$mdDialog.show({
				controller: DialogComentController,
				templateUrl: 'view/client/modal/comentario.tpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: false,
				locals: {
					content: {
						cliente: $scope.clientInfo.name,
						comentario: $scope.clientInfo.comentario
					}
				}
			})
			.then(function(data) {});
	};

	function DialogComentController($scope, $mdDialog, content) {
		$scope.comentario = content.comentario;
		$scope.cliente = content.cliente;
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
			data['gestorId'] = userService.getUser()._id;
			data['clientId'] = $scope.idClient;
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


	$scope.createPortal = function(row, ev) {
		$mdDialog.show({
				controller: createPortalController,
				templateUrl: 'view/client/modal/portal.tpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: false
			})
			.then(function(data) {
				$scope.EditTransPetitionEntity(data)
			});
	};

	function createPortalController($scope, $mdDialog) {
		$scope.portalentity = "";
		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		$scope.answer = function() {
			$mdDialog.hide(this.portalentity);
		};
	}

	$scope.EditTransPetitionEntity =function (trans){
		if (userService.getUser()._id) {
			$http({
					url: '/clients/updateEntity',
					method: "POST",
					data: {'entity': trans, '_id': $scope.clientInfo._id}
				})
				.then(function(result) {
					if (result.data) {
						newToast($mdToast, "Transacción actualizada.");
						$scope.clientInfo.entity = trans;
					} else {
						newToast($mdToast, "Error actualizando transacción.");
					}
				});
		}
	}

	$scope.openPortal = function openPortal(){
   		window.open("http://localhost/portal/"+$scope.clientInfo.entity);
   }

    $scope.deletePortal= function deletePortal(){
   		$http({
			url: '/clients/deleteEntity',
			method: "POST",
			data: {
				'_id': $scope.clientInfo._id
			}
		})
		.then(function(result) {
			 delete $scope.clientInfo.entity;
		});
   }


   $scope.loadStats= function () {
   		$http({
			url: '/transaction/getAll',
			method: "POST",
			data: {
				'clientId': $scope.idClient
			}
		})
		.then(function(result) {
			var serie = {};
			serie.name = $scope.clientInfo.name;
			serie.data = [];
			var stat = 0;

			result.data.forEach(function(value,index,arr){
				if (value.type === "Ingreso") {
					stat += value.cant;
				} else {
					stat -= value.cant;
				}
				var date = new Date(value.date);
				date.setDate(date.getDate() + 1);
				 
				serie.data.push([date.getTime(), stat]); 
			});
			debugger
			loadStatsDefault('statscontent', serie);
		});
   }

   $scope.openDocumentos = function openDocumentos() {
		$location.url("/documents/"+$scope.idClient);
	};
});