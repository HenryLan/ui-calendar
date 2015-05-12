(function () {

    var app = angular.module('demoApp');


    var loginCtrl = function ($scope, $rootScope, $location, userSvc, dataSvc) {

        $scope.message = "Please use MPF/MPF as username/password";
        $scope.username = "";
        $scope.password = "";
        $scope.error = "";        
        
         $scope.login = function () {
             dataSvc.login($scope.username, $scope.password)
             .success(function (data, status, headers, config) {
                 userSvc.setUser(data);

                 $scope.error = "";
                 $location.path("/meeting");
             })
             .error(function (data, status, headers, config) {
                 $scope.error = "Invalid username/password";
             });

        };

    };

    app.controller("loginCtrl", ["$scope", "$rootScope", "$location", "userSvc","dataSvc", loginCtrl]);


}());