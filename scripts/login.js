﻿(function () {

    var app = angular.module('demoApp');


    var loginCtrl = function ($scope, $location, userSvc) {

        $scope.message = "Please use MPF/MPF as username/password";
        $scope.username = "";
        $scope.password = "";
        $scope.error = "";        
        
         $scope.login = function () {
             //if ($scope.username == "MPF" && $scope.password == "MPF") {
             //    $scope.error = "";
             //    $location.path("/meeting");
             //}
             //else {
             //    $scope.error = "Invalid username/password";
             //}
             if (userSvc.login("MPF", "MPF")) {
                    $scope.error = "";
                    $location.path("/meeting");
             }
             else {
                 $scope.error = "Invalid username/password";
             }

        };

    };

    app.controller("loginCtrl", ["$scope", "$location","userSvc", loginCtrl]);


}());