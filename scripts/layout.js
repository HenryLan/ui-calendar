(function () {
    var app = angular.module('demoApp');

    var layoutCtrl = function ($scope) {
        $scope.user = null;
        $scope.name = "Henry";

        activate();

        function activate() {
            console.log("layoutCtrl");
        };
    };

    app.controller("layoutCtrl", ["$scope",layoutCtrl]);
}());