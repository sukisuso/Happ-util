var users = angular.module("users", ['ngRoute', 'ngMaterial', 'ngMessages', 'cl.paging']);

users.controller("usersController", function appController($scope,$location, $mdDialog,$http,$mdToast, userService){
 $scope.rowCollection = [];
 $scope.paging = {
   total: 100,
   current: 1,
   onPageChanged: loadPages,
 };

 function loadPages() {
    console.log('Current page is : ' + $scope.paging.current);
    $scope.currentPage = $scope.paging.current;
  }

  $scope.$on('$viewContentLoaded', function() {
      if(userService.getUser()._id){
         $http({
            url: '/clients/getAllClients',
            method: "POST",
            data: {'gestorId':userService.getUser()._id}
          })
         .then(function(result) {
             $scope.rowCollection = $scope.rowCollection.concat(result.data);
          });
        
      }else{
        $location.url("/");
      }
  });

  
  $scope.status = '  ';

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'view/users/usersmodal.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false 
    })
    .then(function(data) {
      $scope.newUserPetition(data)
    });
  };

  function DialogController($scope, $mdDialog) {
    $scope.user = {};
    $scope.user.name = "";
    $scope.user.surname="";
    $scope.user.type = "";
    $scope.user.email = "";
    $scope.user.dni="";
    $scope.user.direccion="";
    $scope.user.localidad="";  
    $scope.user.telefono=null;
    $scope.user.postal=null;
    $scope.user.comentario ="";
    $scope.user.numero="";
    $scope.user.cuota="";

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

   $scope.goBack = function goBack(){
   		$location.url("/main");
   }


   $scope.newUserPetition = function createUserPetition (data) {
    if(userService.getUser()._id){
      data['gestorId'] =userService.getUser()._id;
      //send petition
      $http({
          url: '/clients/insertClient',
          method: "POST",
          data: data
      })
       .then(function(result) {
          if(result.data){
            newToast($mdToast, "Cliente añadido.");
          }else{
            newToast($mdToast, "Error añadiendo cliente.");
          }
        });
     }
   }

   $scope.openClientModule = function openClientModule(){
      $location.url("/client");
   }
});
