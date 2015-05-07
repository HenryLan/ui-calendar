(function (module) {

    var userSvc = function ($location) {

        var user = {
            userName: "",
            role: "",
            token: "",
            get loggedIn() {
                return this.token;
            }
        };

        var login = function (username, password) {
            user.userName = "Henry Lan";
            user.role = "Lawyer";
            user.token = "abc";

            return true;
        };

        var logout = function () {
            initUser();
            $location.path("/home");
        };

        var initUser = function(){
            user.userName= "";
            user.role= "";
            user.token= "";
        };

        return {
            login: login,
            logout: logout,
            user: user
        };
    };

    module.factory("userSvc", ["$location",userSvc]);

}(angular.module("demoApp")));