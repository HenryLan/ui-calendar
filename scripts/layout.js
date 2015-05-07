(function () {
    var app = angular.module('demoApp');

    var layoutCtrl = function ($scope, userSvc) {
        $scope.user = null;
        $scope.name = "Henry";

        activate();

        function activate() {
            console.log("layoutCtrl");
            $scope.user = userSvc.user;
        };
    };

    app.controller("layoutCtrl", ["$scope","userSvc", layoutCtrl]);
}());