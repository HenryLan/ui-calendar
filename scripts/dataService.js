(function (module) {
    var dataSvc = function ($http) {


        var login = function (username, password) {
            return $http.get("https://api.github.com/users/henrylan");
        };

        return {
            login: login
        };
    };



    module.factory("dataSvc", ["$http", dataSvc]);

}(angular.module("demoApp")));