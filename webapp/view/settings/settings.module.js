/**
 * 
 */
var settings = angular.module("settings", ['ngRoute', 'ngMaterial', 'ngMessages', 'cl.paging']);

settings.controller("settingsController", function ($scope,$location, $mdDialog,$http,$mdToast, userService){
	$scope.goBack = function goBack(){
   		$location.url("/main");
   }

});