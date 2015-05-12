(function (module) {
    var httpPipeline = function (userSvc, $q) {

        var request = function ($config) {
            if (userSvc.user.loggedIn) {
                $config.headers["accesstoken"]=  userSvc.user.token;
            }
            else {
                $config.headers["accesstoken"] =  "test";
            }

            return $q.when($config);
        };

        var response = function(response){
            if (response.status === 401) {
                console.log("Response 401", response);

                $location.path("/home");
            }

            return response || $q.when(response);
        };

        var responseError = function (rejection) {
            if (rejection.status === 401) {
                console.log("Response error 401", rejection);

                $location.path("/home");
            }


            return $q.when(rejection);
        };

        return {
            request: request,
            response: response,
            responseError: responseError
        }
    };

    module.factory("httpPipeline", httpPipeline);
    module.config(function ($httpProvider) {
        $httpProvider.interceptors.push("httpPipeline");
    });

}(angular.module("demoApp")));