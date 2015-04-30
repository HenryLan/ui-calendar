(function () {

    var app = angular.module('demoApp');


    var loginCtrl = function ($scope, $location) {

        $scope.message = "Please user MPF/MPF as username/password";
        $scope.username = "";
        $scope.password = "";
        $scope.error = "";        
        
         $scope.login = function () {
             if ($scope.username == "MPF" && $scope.password == "MPF") {
                 $scope.error = "";
                 $location.path("/meeting");
             }
             else {
                 $scope.error = "Invalid username/password";
             }

        };

    };

    app.controller("loginCtrl", ["$scope", "$location",loginCtrl]);


}());