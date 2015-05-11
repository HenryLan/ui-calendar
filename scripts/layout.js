(function () {
    var app = angular.module('demoApp');

    var layoutCtrl = function ($scope, userSvc) {
        $scope.user = null;
        $scope.name = "Henry";

        $scope.logout = logout;

        activate();

        function activate() {
            console.log("layoutCtrl");
            $scope.user = userSvc.initUser();
        };

        function logout() {
            userSvc.logout();
            console.log(userSvc.user);
            $scope.user = userSvc.initUser(true);
        };
    };

    app.controller("layoutCtrl", ["$scope","userSvc", layoutCtrl]);
}());