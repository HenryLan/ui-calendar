(function (module) {
    var dataSvc = function ($http) {
        return {
            login: login
        };

        var login = function () {

        };
    };



    module.factory("dataSvc", ["$http", dataSvc]);

}(angular.module("demoApp")));