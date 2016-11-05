/**
 * 
 */
var calendar = angular.module("calendar", ['ngRoute']);

calendar.controller("calendarController", function appController($scope, $location,$http, $rootScope, userService) {

  $scope.$on('$viewContentLoaded', function() {

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: new Date(),
      firstDay: 1,
      editable: true,
      businessHours: true,
      eventLimit: true,
      events: function(start, end, tt, callback) {
        debugger
        $http({
              url: '/agenda/getCitas',
              method: "POST",
              data: {'gestorId': userService.getUser()._id}
            })
            .then(function(result) {
              if (result.data.length) {
                callback(result.data);
              } else {
                newToast($mdToast, "Error cargando agenda.");
              }
            });
      },
      eventClick: function(calEvent, jsEvent, view) {

      }
    });
  });


  $scope.goBack = function goBack() {
    $location.url("/main");
  }

});