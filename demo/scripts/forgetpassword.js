(function () {
    var app = angular.module('demoApp');

    var forgetpasswordCtrl = function ($scope, dataSvc) {
        $scope.email = "";
		$scope.info = "";
		//$scope.resetPassword = resetPassword;
		$scope.getPasword = getPasword;

/*         function resetPassword() {
			alert('ok');
        }; */
		
		function getPasword(){
 			dataSvc.resetPassword($scope.email)
			.success(function (data, status, headers, config) {
				$scope.info = "Sent Reset password email";
			})
			.error(function (data, status, headers, config) {
				$scope.info = "Please contact administrator";
			}); 
		};
    };

    app.controller("forgetpasswordCtrl", ["$scope", "dataSvc", forgetpasswordCtrl]);
}());