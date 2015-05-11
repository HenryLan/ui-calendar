(function (module) {
    var storageSvc = function () {

        var setItem = function(key, object){
            sessionStorage.setItem(key, angular.toJson(object));
        };

        var getItem = function (key) {
            var value = sessionStorage.getItem(key);

            if (value) {
                value = angular.fromJson(value);
            }

            return value;
        };

        var removeItem = function (key) {
            sessionStorage.removeItem(key);
        };

        return {
            setItem: setItem,
            getItem: getItem,
            removeItem: removeItem
        };

    };

    module.factory("storageSvc", [storageSvc]);
}(angular.module("demoApp")));