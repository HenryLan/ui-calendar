(function (module) {
    var dataSvc = function ($http, userSvc) {


        var login = function (username, password) {

            var uri = "http://10.10.10.8:7502/meetings-portal/api/v1/login?username=" +username
                +"&password=" +password;
            return $http.get(encodeURI(uri));
            //return $http.get("https://api.github.com/users/henrylan");

        };

        var getMeetings = function () {
            var uri = "http://10.10.10.8:7502/meetings-portal/api/v1/meetings";

            return $http.get(encodeURI(uri));

            //return $http.get("https://api.github.com/users/henrylan");
        };

        var getAgenda = function (meetingId) {
            var uri = "http://10.10.10.8:7502/meetings-portal/api/v1/agenda/" + meedtingId;

            return $http.get(encodeURI(uri));
        };

        return {
            login: login,
            getMeetings: getMeetings
        };
    };



    module.factory("dataSvc", ["$http", dataSvc]);

}(angular.module("demoApp")));