/**
 * 
 */
var calendar = angular.module("calendar", ['ngRoute', "ngMaterial", "materialCalendar"]);

calendar.controller("calendarController", function appController($scope, $location,$http, calendarService, $mdToast, $mdDialog, $rootScope, userService) {
  
    $scope.dayFormat = "d";
    $scope.datesObj = {};
    $scope.tooltips = false;
    $scope.selectedDate = null;
    $scope.selectedDate = [];
    $scope.dataStartMonth = new Date().getMonth();
    $scope.dataStartYear = new Date().getFullYear();
    $scope.dayToDelete = null;

    $scope.firstDayOfWeek = 1; 
    $scope.setDirection = function(direction) {
      $scope.direction = direction;
      $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
    };

    $scope.dayClick = function(date) {
      $scope.dayToDelete = calendarService.getObj(date, userService.getUser()._id);
    };


    $scope.setDayContent = function(date) {
      
      return calendarService.get(date, userService.getUser()._id);
    };

    $scope.goBack = function goBack() {
      calendarService.refresh();
      $location.url("/main");
    };

  $scope.newDateModal = function(ev) {
    $mdDialog.show({
        controller: newDateController,
        templateUrl: 'view/calendar/modal/addDate.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: false
      })
      .then(function(data) {
        $scope.saveDate(data)
      });
  };

  function newDateController($scope, $mdDialog) {
    $scope.date = {};
    $scope.date.date = null;
    $scope.date.desc = null;
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function() {
      $mdDialog.hide(this.date);
    };
  }

  $scope.saveDate = function saveDate(data) {
    if (userService.getUser()._id) {
      data["gestorId"] = userService.getUser()._id;
      $http({
        url: '/agenda/insertCita',
        method: "POST",
        data: data
      })
      .then(function(result) {
         location.reload();
      });
    }
  };

  $scope.$on('$viewContentLoaded', function() {
    if (!userService.auth()) {
      $location.url("/");
    }else{
      $scope.$parent.isLogged= true;
    }
  });

  $scope.deleteDate = function (){
    debugger
    if($scope.dayToDelete){
     $http({
        url: '/agenda/deleteCita',
        method: "POST",
        data: {'_id': $scope.dayToDelete._id}
      })
      .then(function(result) {
         location.reload();
      });
    }
  }

});