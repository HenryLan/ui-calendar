(function () {
    var app = angular.module('demoApp');

    var layoutCtrl = function ($scope, userSvc) {
        $scope.user = null;
        $scope.name = "Henry";

        $scope.logout = logout;

        activate();

        function activate() {
            console.log("layoutCtrl");
            $scope.user = userSvc.user;
        };

        function logout() {
            userSvc.logout();
        };
    };

    app.controller("layoutCtrl", ["$scope","userSvc", layoutCtrl]);
}());