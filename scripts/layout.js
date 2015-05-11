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
            console.log(userSvc.user);
            $scope.user = userSvc.initUser(true);
            $scope.user = null;
        };
    };

    app.controller("layoutCtrl", ["$scope","userSvc", layoutCtrl]);
}());