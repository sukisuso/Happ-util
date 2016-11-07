var users = angular.module("users", ['ngRoute', 'ngMaterial', 'ngMessages', 'cl.paging']);

users.controller("usersController", function appController($scope, $location, $mdDialog, $http, $mdToast, userService) {
  $scope.rowCollection = [];
  $scope.paging = {
    total: 100,
    current: 1,
    size: 10,
    onPageChanged: loadPages,
  };

  function loadPages() {

    $http({
        url: '/clients/getAllClients',
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

  $scope.$on('$viewContentLoaded', function() {
    if (!userService.auth()) {
      $location.url("/");
    }else{
      $scope.$parent.isLogged= true;
    }
  });


  $scope.status = '  ';

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        templateUrl: 'view/users/usersmodal.tpl.html',
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
    $scope.user = {};
    $scope.user.name = "";
    $scope.user.surname = "";
    $scope.user.type = "";
    $scope.user.email = "";
    $scope.user.dni = "";
    $scope.user.direccion = "";
    $scope.user.localidad = "";
    $scope.user.telefono = null;
    $scope.user.postal = null;
    $scope.user.comentario = "";
    $scope.user.numero = "";
    $scope.user.cuota = "";

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function() {
      $mdDialog.hide(this.user);
    };
  }

  $scope.goBack = function goBack() {
    $location.url("/main");
  }


  $scope.newUserPetition = function createUserPetition(data) {
    if (userService.getUser()._id) {
      data['gestorId'] = userService.getUser()._id;
      //send petition
      $http({
          url: '/clients/insertClient',
          method: "POST",
          data: data
        })
        .then(function(result) {
          if (result.data) {
            newToast($mdToast, "Cliente añadido.");
            loadPages();
          } else {
            newToast($mdToast, "Error añadiendo cliente.");
          }
        });
    }
  }

  $scope.openClientModule = function openClientModule(row) {
    $location.url("/client/" + row._id + "/");
  }


  $scope.deleteItem = function deleteItem(row) {

    $http({
        url: '/clients/deleteClient',
        method: "POST",
        data: {
          '_id': row._id
        }
      })
      .then(function(result) {
        if (result.data) {
          newToast($mdToast, "Cliente eliminado.");
          loadPages();
        } else {
          newToast($mdToast, "Error eliminando cliente.");
        }
      });
  }

  $scope.filters = {
    name: "",
    dni: "",
    type: "",
  };

  $scope.filtrar = function() {
    loadPages();
  }

  $scope.clean = function() {
    $scope.filters = {
      name: "",
      dni: "",
      type: "",
    };
  }

  $scope.openEditWindow = function openEditWindow(row, ev){
     $mdDialog.show({
        controller: DialogEditController,
        templateUrl: 'view/users/usersmodal.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: false,
        locals: {
          userEdit: row
        }
      })
      .then(function(data) {
        $scope.updateUserPetition(data)
      });
  }

  function DialogEditController($scope, $mdDialog, userEdit) {
    $scope.user = userEdit;
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function() {
      $mdDialog.hide(this.user);
    };
  }

  $scope.updateUserPetition =function (data){
    if (userService.getUser()._id) {
      data['gestorId'] = userService.getUser()._id;
      //send petition
      $http({
          url: '/clients/updateClient',
          method: "POST",
          data: data
        })
        .then(function(result) {
          if (result.data) {
            newToast($mdToast, "Cliente editado.");
            loadPages();
          } else {
            newToast($mdToast, "Error editando cliente.");
          }
        });
    }
  }
});