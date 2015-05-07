(function (module) {

    var userSvc = function () {

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

        };

        return {
            login: login,
            user: user
        };
    };

    module.factory("userSvc", userSvc);

}(angular.module("demoApp")));