(function (module) {

    var userSvc = function ($location, dataSvc, storageSvc) {
        var userKey = "DEMO_USER_KEY_0955";

        var login = function (username, password) {
            return dataSvc.login(username,password);
        };

        var logout = function () {
            initUser(true);
            $location.path("/home");
        };

        var setUser = function (usr) {
            user.userName = usr.login;
            user.role = usr.name;
            user.token = usr.id;

            storageSvc.setItem(userKey,user)

        };

        var initUser = function (removeUser) {
            var user = {
                userName: "",
                role: "",
                token: "",
                get loggedIn() {
                    return this.token;
                }
            };

            if (removeUser) {
                console.log(removeUser);
                storageSvc.removeItem(userKey);
            }
            else {
                console.log('initUser');
                var localUser = storageSvc.getItem(userKey);

                if (localUser) {
                    console.log(localUser);
                    console.log('load localuser');
                    user.userName = localUser.userName;
                    user.role = localUser.role;
                    user.token = localUser.token;
                };
            }

            
            return user;
        };

        var user = initUser();

        return {
            login: login,
            logout: logout,
            setUser: setUser,
            user: user
        };
    };

    module.factory("userSvc", ["$location", "dataSvc","storageSvc", userSvc]);

}(angular.module("demoApp")));